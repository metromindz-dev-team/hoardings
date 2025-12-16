"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Profile() {
  const [adminData, setAdminData] = useState({});
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        // Call backend API properly
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/profile`,

          {
            withCredentials: true,
          }
        );
        console.log(res);

        const data = res.data;
        setAdminData(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      } catch (error) {
        console.log("Error fetching admin profile:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/update-profile`,
        form,
        {
          withCredentials: true, // 🔥 REQUIRED
        }
      );

      const data = res.data;

      // alert("Profile updated!");
      toast.success("Profile updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handleChangePassword = async () => {
    try {
      // Validation
      if (
        !passwordForm.currentPassword ||
        !passwordForm.newPassword ||
        !passwordForm.confirmPassword
      ) {
        return toast.error("All fields are required");
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        return toast.error("New password and confirm password do not match");
      }

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          withCredentials: true, // 🔥 REQUIRED
        }
      );
console.log(res);

      const data = res.data;

      if (!res.ok) {
        return toast.error(data.message || "Error updating password");
      }

      toast.success("Password updated successfully!");

      // Clear fields
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
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
                    name="name"
                    value={form.name}
                    onChange={handleChange}
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
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
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
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email Address"
                      className="form-control"
                    />
                  </div>
                </fieldset>

                <div className="box mt-5">
                  <button
                    className="tf-btn bg-color-primary pd-10"
                    onClick={handleUpdateProfile}
                  >
                    Update Profile
                  </button>
                </div>

                <h5 className="title">Change password</h5>
                <div className="box grid-layout-3 gap-30">
                  <div className="box-fieldset">
                    <label htmlFor="old-pass">
                      Curent Password<span>*</span>
                    </label>

                    <div className="box-password">
                      <input
                        type="password"
                        id="old-pass"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
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
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
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
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
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
                <button
                  type="button"
                  onClick={handleChangePassword}
                  className="tf-btn bg-color-primary pd-20"
                >
                  Update Password
                </button>
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
      <ToastContainer />
    </>
  );
}
