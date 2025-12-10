"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const [userType, setUserType] = useState("owner");

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
      let apiUrl = "";

      if (userType === "owner") {
        apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/register`;

        await axios.post(apiUrl, {
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.phone,
        });
      } else {
        apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/register`;

        await axios.post(apiUrl, {
          companyName: formData.companyName,
          companyEmail: formData.companyEmail,
          companyPhone: formData.companyPhone,
        });
      }

      setSuccess("Account created successfully!");
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

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 bg-gray-100">
        <img
          alt="banner"
          src="/images/section/banner-register.jpg"
          className="object-cover w-full h-full"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold mb-8">Sign Up</h2>

          {/* USER TYPE SWITCH */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUserType("owner")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                userType === "owner"
                  ? "bg-white text-blue-600 shadow"
                  : "text-gray-600"
              }`}
            >
              Property Owner
            </button>
            <button
              type="button"
              onClick={() => setUserType("company")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                userType === "company"
                  ? "bg-white text-blue-600 shadow"
                  : "text-gray-600"
              }`}
            >
              Company
            </button>
          </div>

          {/* Error / Success Alerts */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* OWNER FIELDS */}
          {userType === "owner" && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </>
          )}

          {/* COMPANY FIELDS */}
          {userType === "company" && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Company Name</label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Company Email</label>
                <input
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  type="email"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Enter company email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Company Phone</label>
                <input
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full border rounded px-4 py-2"
                  placeholder="Enter company phone number"
                  required
                />
              </div>
            </>
          )}

          {/* BUTTON */}
          <button disabled={loading} className="btn btn-primary w-100 py-2">
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
