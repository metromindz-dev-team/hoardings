"use client";
import React, { useState } from "react";
import DropdownSelect from "../common/DropdownSelect";
import MapComponent from "../common/MapComponent";
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

      if(response.status === 201){
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
      <section className="section-top-map style-2">
        <div className="wrap-map">
          <div
            id="map"
            className="row-height"
            data-map-zoom={16}
            data-map-scroll="true"
          >
            <MapComponent />
          </div>
        </div>

        <div className="box">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <form
                  id="contactform"
                  onSubmit={handleSubmit}
                  className="form-contact"
                >
                  <div className="heading-section">
                    <h2 className="title">Get in Touch With Us</h2>
                    <p className="text-1">
                      Have questions about advertising or listing your space?
                      Fill out the form and our team will get back to you
                      shortly.
                    </p>
                  </div>

                  <div className="cols">
                    <fieldset>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        required
                      />
                    </fieldset>

                    <fieldset>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Email"
                        name="email"
                        id="email-contact"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>

                  <div className="cols">
                    <fieldset className="phone">
                      <label htmlFor="phone">Mobile Number:</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Your Mobile Number"
                        name="mobile"
                        id="phone"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>

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
                  </div>

                  <fieldset>
                    <label htmlFor="message">Your Message:</label>
                    <textarea
                      name="message"
                      cols={30}
                      rows={10}
                      placeholder="Enter Your Message"
                      id="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </fieldset>

                  <div className="send-wrap">
                    <button
                      className="tf-btn bg-color-primary fw-7 pd-8"
                      type="submit"
                    >
                      Contact our Experts
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
