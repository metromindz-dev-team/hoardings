"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
export default function AdminLogin() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.identifier || !formData.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/adminLogin`,
        formData
      );

      if (response.status === 200) {
        // localStorage.setItem("adminToken", response.data.token);
        Cookies.set("adminToken", response.data.token, { expires: 7 });

        // Wait for router to be ready
        if (router.isReady) {
          router.replace("/admin-dashboard/dashboard");
        } else {
          // If not ready, push to the route
          router.push("/admin-dashboard/dashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"
      }
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {/* Card */}
            <div
              className={`card shadow-lg border-0 rounded-4 ${
                darkMode ? "bg-secondary text-white" : "bg-white"
              }`}
            >
              <div className="card-body p-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
                    alt="logo"
                    width="80"
                    className="mb-2"
                  />
                  <h3 className="fw-bold">Admin Login</h3>
                  <p className="text-muted">Access the admin dashboard</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger text-center">{error}</div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Identifier */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email or Username
                    </label>
                    <input
                      type="text"
                      name="identifier"
                      className={`form-control ${
                        error && !formData.identifier ? "is-invalid" : ""
                      }`}
                      placeholder="Enter email or username"
                      value={formData.identifier}
                      onChange={handleChange}
                    />
                    {error && !formData.identifier && (
                      <div className="invalid-feedback">
                        This field is required.
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-3 position-relative">
                    <label className="form-label fw-semibold">Password</label>

                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${
                          error && !formData.password ? "is-invalid" : ""
                        }`}
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                      />

                      {/* 🔥 Bootstrap Icons (NOT React icons) */}
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={
                            showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                          }
                        ></i>
                      </span>
                    </div>

                    {error && !formData.password && (
                      <div className="invalid-feedback">
                        Password is required.
                      </div>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Remember me</label>
                  </div>

                  {/* Forgot Password */}
                  <div className="text-end mb-3">
                    <a
                      href="/forgot-password"
                      className="text-primary fw-semibold"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
