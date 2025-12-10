"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("user"); // user | company
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.identifier) newErrors.identifier = "Email or Mobile Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };


const handleLogin = async (e) => {
  e.preventDefault();

  const validation = validate();
  if (Object.keys(validation).length > 0) {
    setErrors(validation);
    return;
  }

  setLoading(true);
  setErrors({});

  try {
    const apiURL =
      activeTab === "user"
        ? `${process.env.NEXT_PUBLIC_API_URL}/users/login`
        : `${process.env.NEXT_PUBLIC_API_URL}/company/login`;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();


    if (response.ok) {
      // DELETE any existing tokens (avoid conflict)
      Cookies.remove("ownerToken");
      Cookies.remove("companyToken");

      // SAVE TOKEN BASED ON ROLE
      if (activeTab === "user") {
        Cookies.set("ownerToken", data.token, { expires: 1 }); // 1 day
        router.push("/owner-dashboard/dashboard");
      } else {
        Cookies.set("companyToken", data.token, { expires: 1 }); // 1 day
        router.push("/company-dashboard/dashboard");
      }
    } else {
      setErrors({ general: data.message });
    }
  } catch (error) {
    setErrors({ general: "Network error. Try again." });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
        <div className="card shadow border-0">
          <div className="card-body p-4 p-md-5">

            {/* 🔹 TAB SWITCHER */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "user" ? "active" : ""}`}
                  onClick={() => setActiveTab("user")}
                >
                  User Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "company" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("company")}
                >
                  Company Login
                </button>
              </li>
            </ul>

            {/* TITLE */}
            <h3 className="text-center mb-3">
              {activeTab === "user" ? "User Login" : "Company Login"}
            </h3>

            <p className="text-muted text-center mb-4">
              Enter your credentials to access your account.
            </p>

            {/* ERROR MESSAGE */}
            {errors.general && (
              <div className="alert alert-danger text-center">{errors.general}</div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin}>
              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">Email Address / Phone Number</label>
                <input
                  type="text"
                  name="identifier"
                  className={`form-control ${errors.identifier ? "is-invalid" : ""}`}
                  placeholder="Enter email or phone"
                  value={formData.identifier}
                  onChange={handleChange}
                />
                {errors.identifier && (
                  <div className="invalid-feedback">{errors.identifier}</div>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-3 mb-3"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {/* FORGOT PASSWORD */}
              <div className="text-center mb-2">
                <Link
                  href={
                    activeTab === "user"
                      ? "/users/forgot-password"
                      : "/company/forgot-password"
                  }
                >
                  Forgot Password?
                </Link>
              </div>

              {/* SIGNUP LINK */}
              <div className="text-center">
                <p className="">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="fw-semibold"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
