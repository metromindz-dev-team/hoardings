
"use client";
import React from "react";

export default function Contact() {
  return (
    <div className="section-contact style-2 tf-spacing-7">
      <div className="tf-container">
        <div className="row justify-content-end">
          <div className="col-md-6">
            <form
              className="form-get-in-touch"
              onSubmit={(e) => e.preventDefault()}
            >
              <h2 className="text-color-heading title-form fw-5 mb-0">
                Get in touch
              </h2>

              <p className="text-1 text-color-default fw-3">
                Fill out the form and we’ll get back to you with the best options.
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
                    placeholder="Email"
                    name="Enter Your Email"
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
                  type="text"
                  className="form-control"
                  placeholder="Your phone number"
                  name="Enter Your Mobile No."
                  id="phone"
                  required
                />
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
                  defaultValue={""}
                />
              </fieldset>

              <div className="wrap-btn">
                <a
                  href="#"
                  className="tf-btn bg-color-primary pd-26 btn-border rounded-cycle"
                >
                  Contact Our Team
                  <i className="icon-arrow-up-right" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
