"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";
import MapComponent from "../common/MapComponent";

export default function Contact() {
  return (
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
                onSubmit={(e) => e.preventDefault()}
                className="form-contact"
              >
                <div className="heading-section">
                  <h2 className="title">Get in Touch With Us</h2>
                  <p className="text-1">
                    Have questions about advertising or listing your space? Fill out the form and our team will get back to you shortly.
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
                      required
                    />
                  </fieldset>
                </div>

                <div className="cols">
                  <fieldset className="phone">
                    <label htmlFor="phone">Mobile Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Mobile Number"
                      name="phone"
                      id="phone"
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
                    defaultValue={""}
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
  );
}
