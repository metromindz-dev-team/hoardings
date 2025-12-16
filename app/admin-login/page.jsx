// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const [formData, setFormData] = useState({
//     identifier: "",
//     password: "",
//     rememberMe: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (!formData.identifier || !formData.password) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/admin/adminLogin`,
//         formData,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         if (response.data.role === "Admin") {
//           window.location.href = "/admin-dashboard/dashboard";
//         }

//         // router.replace("/admin-dashboard/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={
//         darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"
//       }
//     >
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-8 col-lg-6">
//             {/* Card */}
//             <div
//               className={`card shadow-lg border-0 rounded-4 ${
//                 darkMode ? "bg-secondary text-white" : "bg-white"
//               }`}
//             >
//               <div className="card-body p-5">
//                 {/* Logo */}
//                 <div className="text-center mb-4">
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
//                     alt="logo"
//                     width="80"
//                     className="mb-2"
//                   />
//                   <h3 className="fw-bold">Admin Login</h3>
//                   <p className="text-muted">Access the admin dashboard</p>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="alert alert-danger text-center">{error}</div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit}>
//                   {/* Identifier */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Email or Username
//                     </label>
//                     <input
//                       type="text"
//                       name="identifier"
//                       className={`form-control ${
//                         error && !formData.identifier ? "is-invalid" : ""
//                       }`}
//                       placeholder="Enter email or username"
//                       value={formData.identifier}
//                       onChange={handleChange}
//                     />
//                     {error && !formData.identifier && (
//                       <div className="invalid-feedback">
//                         This field is required.
//                       </div>
//                     )}
//                   </div>

//                   {/* Password Field */}
//                   <div className="mb-3 position-relative">
//                     <label className="form-label fw-semibold">Password</label>

//                     <div className="input-group">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         className={`form-control ${
//                           error && !formData.password ? "is-invalid" : ""
//                         }`}
//                         placeholder="Enter password"
//                         value={formData.password}
//                         onChange={handleChange}
//                       />

//                       {/* 🔥 Bootstrap Icons (NOT React icons) */}
//                       <span
//                         className="input-group-text"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <i
//                           className={
//                             showPassword ? "bi bi-eye-slash" : "bi bi-eye"
//                           }
//                         ></i>
//                       </span>
//                     </div>

//                     {error && !formData.password && (
//                       <div className="invalid-feedback">
//                         Password is required.
//                       </div>
//                     )}
//                   </div>

//                   {/* Remember Me */}
//                   <div className="mb-3 form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       name="rememberMe"
//                       checked={formData.rememberMe}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Remember me</label>
//                   </div>

//                   {/* Forgot Password */}
//                   {/* <div className="text-end mb-3">
//                     <a
//                       href="/forgot-password"
//                       className="text-primary fw-semibold"
//                     >
//                       Forgot Password?
//                     </a>
//                   </div> */}

//                   {/* Login Button */}
//                   <button
//                     type="submit"
//                     className="btn btn-primary w-100 py-2"
//                     disabled={loading}
//                   >
//                     {loading ? "Logging in..." : "Login"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const primaryOrange = "#f7931e";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        if (response.data.role === "Admin") {
          window.location.href = "/admin-dashboard/dashboard";
        }

        // router.replace("/admin-dashboard/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* LEFT IMAGE */}
        <div className="auth-image d-none d-md-block">
          <img src="/images/section/contact-page.webp" alt="Admin Login" />
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form">
          {/* LOGO */}
          <div className="logo-wrap">
            <Link href="/">
              <img src="/images/logo/logo.png" alt="Logo" />
            </Link>
          </div>

          <h4 className="text-center mb-4">Admin Login</h4>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Email / Username</label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter email or username"
              value={formData.identifier}
              onChange={handleChange}
            />

            <label>Password</label>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)}>👁</span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="footer">
              <Link href="/" className="back">
                ← Go back
              </Link>
            </div>
          </form>
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
          max-width: 200px;
        }

        form label {
          font-size: 14px;
          margin-top: 15px;
        }

        form input {
          width: 100%;
          padding: 12px;
          margin-top: 5px;
          border-radius: 12px;
          border: 1px solid #ddd;
        }

        .password-wrap {
          position: relative;
        }

        .password-wrap span {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }

        form button {
          width: 100%;
          margin-top: 25px;
          padding: 12px;
          border-radius: 30px;
          border: none;
          background: ${primaryOrange};
          color: white;
          font-weight: 600;
        }

        .footer {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }

        .back {
          font-size: 14px;
          color: #6c757d;
          text-decoration: none;
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
