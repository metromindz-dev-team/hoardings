"use client";
import React from "react";

export default function Profile() {
  return (
    <div className="main-content style-2 dashboardProfilePage">
      <div className="main-content-inner wrap-dashboard-content-2">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>
        
        <div className="widget-box-2">
          <div className="box">
            <h3 className="title">Profile Details</h3>

            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset className="box box-fieldset">
                <label htmlFor="name">
                  Full Name<span>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Your Full Name"
                  className="form-control"
                />
              </fieldset>
              
              <fieldset className="grid-layout-2 gap-30 box-info-2">
                <div className="box-fieldset">
                  <label htmlFor="phone">
                    Mobile No.<span>*</span>
                  </label>
                  <input
                    type="number"
                    id="phone"
                    placeholder="Enter Your Mobile No."
                    className="form-control"
                  />
                </div>

                <div className="box-fieldset">
                  <label htmlFor="email">
                    Email Address<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter Your Email Address"
                    className="form-control"
                  />
                </div>
              </fieldset>

              <div className="box mt-5">
                <a href="#" className="tf-btn bg-color-primary pd-10">
                  Update Profile
                </a>
              </div>

              <h5 className="title">Change password</h5>
              <div className="box grid-layout-3 gap-30">
                <div className="box-fieldset">
                  <label htmlFor="old-pass">
                    Old Password<span>*</span>
                  </label>

                  <div className="box-password">
                    <input
                      type="password"
                      id="old-pass"
                      className="form-contact password-field"
                      placeholder="Enter Old Password"
                    />
                    <span className="show-pass">
                      <i className="icon-pass icon-hide" />
                      <i className="icon-pass icon-view" />
                    </span>
                  </div>
                </div>

                <div className="box-fieldset">
                  <label htmlFor="new-pass">
                    New Password<span>*</span>
                  </label>

                  <div className="box-password">
                    <input
                      type="password"
                      id="new-pass"
                      className="form-contact password-field2"
                      placeholder="Enter New Password"
                    />
                    <span className="show-pass2">
                      <i className="icon-pass icon-hide" />
                      <i className="icon-pass icon-view" />
                    </span>
                  </div>
                </div>

                <div className="box-fieldset mb-30">
                  <label htmlFor="confirm-pass">
                    Confirm Password<span>*</span>
                  </label>
                  <div className="box-password">
                    <input
                      type="password"
                      id="confirm-pass"
                      className="form-contact password-field3"
                      placeholder="Confirm New Password"
                    />
                    <span className="show-pass3">
                      <i className="icon-pass icon-hide" />
                      <i className="icon-pass icon-view" />
                    </span>
                  </div>
                </div>
              </div>
            </form>

            <div className="box">
              <a href="#" className="tf-btn bg-color-primary pd-20">
                Update Password
              </a>
            </div>
          </div>
        </div>

        {/* .footer-dashboard */}
        <div className="footer-dashboard">
          <p>Copyright © {new Date().getFullYear()} My Hoardings</p>
          <ul className="list">
            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms and Conditions</a>
            </li>
          </ul>
        </div>
        {/* .footer-dashboard */}
      </div>

      <div className="overlay-dashboard" />
    </div>
  );
}
