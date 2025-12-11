"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      // 👉 Axios login request
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/company/login`,
        formData
      );

      const data = res.data;

      // Successful login
      toast.success("Login successful!");

      // Save token + companyId
    //   localStorage.setItem("token", data.token);
      localStorage.setItem("companyId", data.company._id);

      // Redirect back to previous page
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      // Axios error handling
      if (error.response) {
        toast.error(error.response.data.message || "Invalid login details");
      } else {
        toast.error("Network error, try again later!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center w-full bg-gray-100">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            fill
            alt="Company Login Banner"
            className="object-cover"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-10 bg-white shadow-lg">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Company Login
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Login to submit your enquiries
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="identifier"
                  className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
                  placeholder="Enter your email"
                  value={formData.identifier}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-3 mb-3"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Don't have an account?{" "}
              <a href="/company/signup" className="text-blue-600 underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
