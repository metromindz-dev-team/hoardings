"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [companyId, setCompanyId] = useState(null);
  const [companyToken, setCompanyToken] = useState(null);
  const [existingFile, setExistingFile] = useState(null);

  const [form, setForm] = useState({
    companyName: "",
    companyMobile: "",
    companyEmail: "",
    pincode: "",
    city: "",
    state: "",
    registeredAddress: "",
    panNumber: "",
    gstNumber: "",
    incorporationCertificate: null,
  });

  // ============================
  // Decode JWT
  // ============================
  function decodeJWT(token) {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  // ============================
  // FETCH COMPANY DETAILS
  // ============================
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = Cookies.get("companyToken");
        if (!token) {
          console.log("No company token found!");
          return;
        }

        setCompanyToken(token);

        const decoded = decodeJWT(token);
        const id = decoded.id;

        setCompanyId(id);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/company/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;

        setForm((prev) => ({
          ...prev,
          companyName: data.companyName || "",
          companyMobile: data.companyMobile || "",
          companyEmail: data.companyEmail || "",
          pincode: data.pincode || "",
          city: data.city || "",
          state: data.state || "",
          registeredAddress: data.registeredAddress || "",
          panNumber: data.panNumber || "",
          gstNumber: data.gstNumber || "",
        }));
        setExistingFile(data.incorporationCertificate || null);
      } catch (err) {
        console.log("Error fetching company:", err);
      }
    };

    fetchCompany();
  }, []);

  // ============================
  // HANDLE INPUT CHANGE
  // ============================
  const handleChange = (e) => {
    const { id, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  // ============================
  // FETCH ADDRESS FROM PINCODE
  // ============================
  useEffect(() => {
    const fetchAddressFromPin = async () => {
      if (form?.pincode?.length === 6) {
        try {
          const res = await axios.get(
            `https://api.postalpincode.in/pincode/${form.pincode}`
          );
          const postOffice = res.data[0]?.PostOffice?.[0];

          if (postOffice) {
            setForm((prev) => ({
              ...prev,
              city: postOffice.District || "",
              state: postOffice.State || "",
            }));
          }
        } catch (e) {
          console.log("Error fetching pincode:", e);
        }
      }
    };

    fetchAddressFromPin();
  }, [form.pincode]);

  // ============================
  // SUBMIT FORM
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId || !companyToken) {
      toast.error("Authentication error! Please login again.");
      return;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (key === "incorporationCertificate") {
        if (value instanceof File) {
          // Only append if new file selected
          formData.append("incorporationCertificate", value);
        }
      } else {
        formData.append(key, value);
      }
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${companyToken}`,
          },
        }
      );

      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <>
      <div className="main-content style-2 dashboardProfilePage">
        <div className="main-content-inner wrap-dashboard-content-2">
          <div className="widget-box-2">
            <div className="box">
              <h3 className="title">Profile Details</h3>

              <form onSubmit={handleSubmit}>
                {/* Company Name */}
                <fieldset className="box box-fieldset">
                  <label htmlFor="companyName">
                    Company Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Enter Your Company Name"
                  />
                </fieldset>

                {/* Mobile + Email */}
                <fieldset className="grid-layout-2 gap-30 box-info-2">
                  <div className="box-fieldset">
                    <label htmlFor="companyMobile">
                      Company Mobile No.<span>*</span>
                    </label>
                    <input
                      type="number"
                      id="companyMobile"
                      value={form.companyMobile}
                      onChange={handleChange}
                      placeholder="Enter Mobile No."
                    />
                  </div>

                  <div className="box-fieldset">
                    <label htmlFor="companyEmail">
                      Company Email Address<span>*</span>
                    </label>
                    <input
                      type="email"
                      id="companyEmail"
                      value={form.companyEmail}
                      onChange={handleChange}
                      placeholder="Enter Email"
                    />
                  </div>
                </fieldset>

                {/* Pincode + City */}
                <fieldset className="grid-layout-2 gap-30 box-info-2 mt-3">
                  <div className="box-fieldset">
                    <label htmlFor="pincode">
                      Pincode<span>*</span>
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="Enter Pincode"
                    />
                  </div>

                  <div className="box-fieldset">
                    <label htmlFor="city">
                      City<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      readOnly
                    />
                  </div>
                </fieldset>

                {/* State + Address */}
                <fieldset className="grid-layout-2 gap-30 box-info-2 mt-3">
                  <div className="box-fieldset">
                    <label htmlFor="state">
                      State<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                      readOnly
                    />
                  </div>

                  <div className="box-fieldset">
                    <label htmlFor="registeredAddress">
                      Registered Address<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="registeredAddress"
                      value={form.registeredAddress}
                      onChange={handleChange}
                      placeholder="Registered Address"
                    />
                  </div>
                </fieldset>

                {/* PAN + GST */}
                <fieldset className="grid-layout-2 gap-30 box-info-2 mt-3">
                  <div className="box-fieldset">
                    <label htmlFor="panNumber">
                      PAN Number<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="panNumber"
                      value={form.panNumber}
                      onChange={handleChange}
                      placeholder="PAN Number"
                    />
                  </div>

                  <div className="box-fieldset">
                    <label htmlFor="gstNumber">
                      GST Number<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="gstNumber"
                      value={form.gstNumber}
                      onChange={handleChange}
                      placeholder="GST Number"
                    />
                  </div>
                </fieldset>

                {/* File Upload */}
                <fieldset className="box box-fieldset mt-3">
                  <label htmlFor="incorporationCertificate">
                    Incorporation Certificate<span>*</span>
                  </label>

                  <input
                    type="file"
                    id="incorporationCertificate"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="form-control p-4 rounded-4"
                  />

                  {existingFile && (
                    <p className="existing-file mt-2">
                      Uploaded File: {existingFile.split("/").pop()}
                    </p>
                  )}
                </fieldset>

                <div className="box mt-5">
                  <button
                    type="submit"
                    className="tf-btn bg-color-primary pd-10"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="footer-dashboard">
            <p>Copyright © 2025 My Hoardings</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
