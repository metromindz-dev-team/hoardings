"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Sidebar({ property }) {
  const propertyId = property._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    campagainFrom: "",
    campagainTo: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // -------------------------------------------------------------
  // LOAD SAVED FORM DATA ON PAGE LOAD (AFTER LOGIN RETURN)
  // -------------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("enquiryFormData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // -------------------------------------------------------------
  // SAVE FORM DATA BEFORE REDIRECTING TO LOGIN
  // -------------------------------------------------------------
  const saveFormToLocalStorage = () => {
    localStorage.setItem("enquiryFormData", JSON.stringify(formData));
  };

  const clearSavedFormData = () => {
    localStorage.removeItem("enquiryFormData");
  };

  // -------------------------------------------------------------
  // VALIDATION
  // -------------------------------------------------------------
  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (!formData.mobile.trim()) {
      toast.error("Mobile number is required");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      toast.error("Enter a valid 10-digit number");
      return false;
    }

    if (!formData.campagainFrom) {
      toast.error("Start date is required");
      return false;
    }

    if (!formData.campagainTo) {
      toast.error("End date is required");
      return false;
    }

    if (formData.campagainTo < formData.campagainFrom) {
      toast.error("End date cannot be before start date");
      return false;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required");
      return false;
    }

    return true;
  };

  // -------------------------------------------------------------
  // INPUT HANDLER
  // -------------------------------------------------------------
  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    localStorage.setItem("enquiryFormData", JSON.stringify(updated)); // auto-save on typing
  };

  // -------------------------------------------------------------
  // SUBMIT HANDLER
  // -------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const companyId = localStorage.getItem("companyId");

    // If not logged in → save form & redirect
    if (!companyId) {
      saveFormToLocalStorage();
      toast.error("Please login first");

      setTimeout(() => {
        window.location.href = "/enquiry-login";
      }, 1000);

      return;
    }

    // Logged in → submit form
    try {
      setSubmitting(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/enquiries`,
        {
          ...formData,
          poster: propertyId,
          appliedBy: companyId,
        }
      );
      const data = res.data;

      if (res.status === 201) {
        toast.success("Enquiry submitted successfully!");

        //  Clear form & localStorage
        setFormData({
          name: "",
          email: "",
          mobile: "",
          campagainFrom: "",
          campagainTo: "",
          message: "",
        });

        clearSavedFormData();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Network error! Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="tf-sidebar sticky-sidebar">
        <form className="form-contact-agent" onSubmit={handleSubmit}>
          <h4 className="heading-title mb-20">Enquire Now</h4>

          <fieldset>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Your Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </fieldset>

          <div className="flex gap-5">
            <fieldset>
              <input
                type="date"
                className="form-control"
                name="campagainFrom"
                value={formData.campagainFrom}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </fieldset>

            <fieldset>
              <input
                type="date"
                className="form-control"
                name="campagainTo"
                value={formData.campagainTo}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </fieldset>
          </div>

          <fieldset>
            <textarea
              name="message"
              rows={5}
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
            />
          </fieldset>

          <div className="wrap-btn">
            <button
              type="submit"
              className="tf-btn bg-color-primary fw-6 w-full"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
