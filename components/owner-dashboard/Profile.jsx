"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

export default function Profile() {
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [pendingPopup, setPendingPopup] = useState(false);
  const [existingPanFile, setExistingPanFile] = useState(null);
  const [existingAddressProof, setExistingAddressProof] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    panNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    panDocument: null,
    addressProof: null,
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
  // FETCH USER DETAILS
  // ============================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const token = Cookies.get("ownerToken");
        // console.log("Token value is",token);

        // if (!token) return;

        // setUserToken(token);
        // const decoded = decodeJWT(token);
        // const id = decoded.id;

        // setUserId(id);

        // const res = await axios.get(
        //   `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            withCredentials: true,
          }
        );

        const data = res.data;

        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
          mobileNumber: data.mobileNumber || "",
          panNumber: data.panNumber || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          panDocument: null,
          addressProof: null,
        });

        // Save existing files
        setExistingPanFile(data.panDocument || null);
        setExistingAddressProof(data.addressProof || null);

        if (data.profileStatus === "Incomplete") {
          setShowPopup(true);
        }
        if (data.profileStatus === "Pending") {
          setPendingPopup(true);
        }
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

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
  // SUBMIT FORM
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!userId || !userToken) {
    //   toast.error("Authentication error. Please login again.");
    //   return;
    // }

    const formData = new FormData();

    // Append text fields
    for (const [key, value] of Object.entries(form)) {
      if (key === "panDocument" || key === "addressProof") {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, value);
      }
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Profile Updated Successfully!");
      setShowPopup(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <>
      {/* POPUP */}
      {showPopup && (
        <div className="popup-warning">
          <div className="popup-box">
            <p>Your profile is incomplete. Please update your details.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
      {pendingPopup && (
        <div className="popup-warning">
          <div className="popup-box">
            <p>
              Your profile verification request is pending. Please wait for
              approval.
            </p>
            <button onClick={() => setPendingPopup(false)}>OK</button>
          </div>
        </div>
      )}

      <div className="main-content style-2 dashboardProfilePage">
        <div className="main-content-inner wrap-dashboard-content-2">
          <div className="widget-box-2">
            <div className="box">
              <h3 className="title">Profile Details</h3>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <fieldset className="box box-fieldset">
                  <label>
                    Full Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                  />
                </fieldset>

                {/* Phone + Email */}
                <fieldset className="grid-layout-2 gap-30 box-info-2">
                  <div className="box-fieldset">
                    <label>
                      Mobile Number<span>*</span>
                    </label>
                    <input
                      type="number"
                      id="mobileNumber"
                      value={form.mobileNumber}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                    />
                  </div>

                  <div className="box-fieldset">
                    <label>
                      Email<span>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                    />
                  </div>
                </fieldset>

                {/* PAN + Address */}
                <fieldset className="grid-layout-2 gap-30 box-info-2 mt-3">
                  <div className="box-fieldset">
                    <label>
                      PAN Number<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="panNumber"
                      value={form.panNumber}
                      onChange={handleChange}
                      placeholder="Enter PAN Number"
                    />
                  </div>

                  <div className="box-filedset">
                    <label>
                      Address<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                    />
                  </div>
                </fieldset>

                {/* City + State + Pincode */}
                <fieldset className="grid-layout-3 gap-30 box-info-2 mt-3">
                  <div className="box-fieldset">
                    <label>
                      Pincode<span>*</span>
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="Pincode"
                    />
                  </div>

                  <div className="box-fieldset">
                    <label>
                      City<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      disabled={form.city}
                      readOnly
                    />
                  </div>

                  <div className="box-fieldset">
                    <label>
                      State<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                      disabled={form.state}
                      readOnly
                    />
                  </div>
                </fieldset>

                {/* PAN Document */}
                <fieldset className="box box-fieldset mt-3">
                  <label>
                    PAN Document<span>*</span>
                  </label>
                  <input
                    type="file"
                    id="panDocument"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="form-control p-4 rounded-4"
                  />

                  {existingPanFile && (
                    <p className="existing-file mt-2">
                      Uploaded File:{" "}
                      <a href={existingPanFile} target="_blank">
                        View
                      </a>
                    </p>
                  )}
                </fieldset>

                {/* Address Proof */}
                <fieldset className="box box-fieldset mt-3">
                  <label>
                    Address Proof<span>*</span>
                  </label>
                  <input
                    type="file"
                    id="addressProof"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="form-control p-4 rounded-4"
                  />

                  {existingAddressProof && (
                    <p className="existing-file mt-2">
                      Uploaded File:{" "}
                      <a href={existingAddressProof} target="_blank">
                        View
                      </a>
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
            <p>© 2025 My Hoardings</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
