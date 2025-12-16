"use client";
import DropdownSelect from "@/components/common/DropdownSelect";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    interestedIn: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestChange = (value) => {
    setFormData({ ...formData, interestedIn: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.interestedIn || formData.interestedIn === "Select") {
      toast.error("Please select what you are interested in.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        formData
      );

      if (response.status === 201) {
        toast.success(
          "Your message has been sent. Our team will contact you soon!"
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          interestedIn: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        err.response?.data?.message || "Failed to submit contact form"
      );
    }
  };
  return (
    <>
      <div className="section-contact style-2 tf-spacing-7">
        <div className="tf-container">
          <div className="row justify-content-end">
            <div className="col-md-6">
              <form className="form-get-in-touch" onSubmit={handleSubmit}>
                <h2 className="text-color-heading title-form fw-5 mb-0">
                  Get in touch
                </h2>

                <p className="text-1 text-color-default fw-3">
                  Fill out the form and we’ll get back to you with the best
                  options.
                </p>

                <div className="grid-2">
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="name3">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      id="name3"
                      required
                    />
                  </fieldset>

                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="email3">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      id="email3"
                      required
                    />
                  </fieldset>
                </div>

                <fieldset className="phone">
                  <label className="text-1 fw-6 mb-12" htmlFor="phone">
                    Mobile No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Your phone number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    id="phone"
                    required
                  />
                </fieldset>

                <fieldset>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      What are you interested in?
                    </label>

                    <DropdownSelect
                      options={["Select", "Advertising", "Listing"]}
                      addtionalParentClass=""
                      selectedValue={formData.interestedIn}
                      onChange={handleInterestChange}
                      required
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <label className="text-1 fw-6 mb-12" htmlFor="message3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="Enter Your Message"
                    id="message3"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </fieldset>

                <div className="wrap-btn">
                  <button
                    type="submit"
                    className="tf-btn bg-color-primary pd-26 btn-border rounded-cycle"
                  >
                    Contact Our Team
                    <i className="icon-arrow-up-right" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
