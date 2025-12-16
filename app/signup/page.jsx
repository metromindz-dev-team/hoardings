"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const [userType, setUserType] = useState("company");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const primaryOrange = "#f7931e";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (userType === "owner") {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.phone,
        });
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/company/register`,
          {
            companyName: formData.companyName,
            companyEmail: formData.companyEmail,
            companyMobile: formData.companyPhone,
          }
        );
      }

      setSuccess(
        "Account created successfully! Check your email to set your password."
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        companyEmail: "",
        companyPhone: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    if (userType === "owner") {
      return (
        <>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyEmail">Company Email</label>
          <input
            id="companyEmail"
            name="companyEmail"
            type="email"
            value={formData.companyEmail}
            onChange={handleChange}
            placeholder="Enter company email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyPhone">Company Phone</label>
          <input
            id="companyPhone"
            name="companyPhone"
            type="tel"
            value={formData.companyPhone}
            onChange={handleChange}
            placeholder="Enter company phone"
            required
          />
        </div>
      </>
    );
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* LEFT IMAGE */}
        <div className="auth-image d-none d-md-block">
          <img src="/images/section/contact-page.webp" alt="Signup" />
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form">
          {/* LOGO */}
          <div className="logo-wrap">
            <Link href="/">
              <img src="/images/logo/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* TABS */}
          <div className="tabs">
            <button
              type="button"
              className={userType === "owner" ? "active" : ""}
              onClick={() => setUserType("owner")}
            >
              Property Owner
            </button>
            <button
              type="button"
              className={userType === "company" ? "active" : ""}
              onClick={() => setUserType("company")}
            >
              Company
            </button>
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-stack">{renderFields()}</div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="switch">
            Already have an account? <Link href="/login">Sign In</Link>
          </p>

          <p className="back">
            <Link href="/">← Go back</Link>
          </p>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f5f9;
          padding: 20px;
        }

        .auth-card {
          display: flex;
          width: 100%;
          max-width: 1250px;
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .auth-image {
          flex: 1;
        }

        .auth-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .auth-form {
          flex: 1;
          padding: 40px;
        }

        .logo-wrap {
          text-align: center;
          margin-bottom: 20px;
        }

        .logo-wrap img {
          max-width: 180px;
        }

        .tabs {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }

        .tabs button {
          background: none;
          border: none;
          font-size: 18px;
          color: #777;
          cursor: pointer;
          padding-bottom: 5px;
        }

        .tabs .active {
          color: ${primaryOrange};
          border-bottom: 2px solid ${primaryOrange};
        }

        .helper-text {
          text-align: center;
          font-size: 14px;
          color: #777;
          margin-bottom: 15px;
        }

        .form-stack {
          display: flex;
          flex-direction: column;
          gap: 18px; /* 👈 space between fields */
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px; /* 👈 space between label & input */
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #444;
        }

        .form-group input {
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #ddd;
          font-size: 14px;
        }

        .form-group input:focus {
          outline: none;
          border-color: ${primaryOrange};
          box-shadow: 0 0 0 2px rgba(247, 147, 30, 0.15);
        }

        form button {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          border-radius: 30px;
          border: none;
          background: ${primaryOrange};
          color: #fff;
          font-weight: 600;
        }

        .switch,
        .back {
          text-align: center;
          margin-top: 15px;
          font-size: 14px;
        }

        .switch a,
        .back a {
          color: ${primaryOrange};
        }

        .error {
          color: red;
          text-align: center;
          margin-bottom: 10px;
        }

        .success {
          color: green;
          text-align: center;
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .auth-card {
            flex-direction: column;
          }

          .auth-form {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
