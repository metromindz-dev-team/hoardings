"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "../../public/images/section/contact-page.webp";

export default function LoginPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const primaryOrange = "#f7931e";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.identifier)
      newErrors.identifier = "Email or Mobile Number is required";
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
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message });
        return;
      }

      if (data.role === "PropertyOwner") {
        router.push("/owner-dashboard/dashboard");
      } else if (data.role === "Company") {
        router.push("/company-dashboard/dashboard");
      } else {
        router.push("/login");
      }
    } catch {
      setErrors({ general: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* LEFT IMAGE */}
        <div className="auth-image d-none d-md-block">
          <img src="/images/section/contact-page.webp" alt="Auth" />
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form">
          <div className="logo-wrap">
            <Link href={`/`} className="site-logo">
              <img
                className="logo_header"
                alt=""
                data-light="/images/logo/logo.png"
                data-dark="/images/logo/logo.png"
                src="/images/logo/logo.png"
              />
            </Link>
          </div>

          {/* TABS */}
          <div className="tabs">
            {["user", "company"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "user" ? "User Login" : "Company Login"}
              </button>
            ))}
          </div>

          {/* ERROR MESSAGE */}
          {errors.general && (
            <div className="alert alert-danger text-center">
              {errors.general}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin}>
            <label>Email / Phone</label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter your email or phone"
              value={formData.identifier}
              onChange={handleChange}
            />

            <label>Password</label>
            <div className="password-wrap">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)}>👁</span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <Link
              href={
                activeTab === "user"
                  ? "/users/forgot-password"
                  : "/company/forgot-password"
              }
              className="forgot"
              style={{
                marginTop: "10px",
              }}
            >
              Forgot Password?
            </Link>
            <div className="footer">
              <p className="switch">
                Don’t have an account? <Link href="/signup">Sign Up</Link>
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  color: "#6c757d",
                  fontSize: "14px",
                }}
              >
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
          // height: 80vh;
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
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          border: none;
          background: none;
          font-size: 20px;
          cursor: pointer;
        }

        .tabs {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
        }

        .tabs button {
          background: none;
          border: none;
          font-weight: 500;
          padding-bottom: 5px;
          cursor: pointer;
          color: #777;
          font-size: 20px;
        }

        .tabs .active {
          color: ${primaryOrange};
          border-bottom: 2px solid ${primaryOrange};
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

        .forgot {
          display: block;
          margin-top: 10px;
          text-align: center;
          color: ${primaryOrange};
          font-size: 14px;
        }

        .switch {
          margin-top: 20px;
          text-align: center;
        }

        .logo-wrap {
          text-align: center;
          margin-bottom: 20px;
        }

        .logo-wrap img {
          max-width: 200px;
          height: auto;
        }
          .footer{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          }

        /* MOBILE */
        @media (max-width: 768px) {
          .auth-card {
            flex-direction: column;
          }

          .auth-form {
            padding: 30px 20px;
          }

          h2 {
            text-align: center;
          }
            .tabs button{
            font-size: 16px;}
        }
      `}</style>
    </div>
  );
}
