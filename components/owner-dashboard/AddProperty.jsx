"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropdownSelect from "../common/DropdownSelect";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    hoardingType: "",
    width: "",
    height: "",
    backlit: "",
    price: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    description: "",
    location: "",
    features: [],
  });

  const [images, setImages] = useState([]);
  const [pendingPopup, setPendingPopup] = useState(false);
  const [status, SetStatus] = useState("");

  // ===============================
  // IMAGE SELECT
  // ===============================
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      toast.error("You can upload up to 5 images.");
      return;
    }

    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        newImages.push({ file, preview: ev.target.result });

        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // ===============================
  // INPUT HANDLER
  // ===============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (feature) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  // ===============================
  // DECODE JWT
  // ===============================
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

  // ===============================
  // SUBMIT FORM
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("ownerToken");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const decoded = decodeJWT(token);
      const userId = decoded?.id;

      const formDataToSend = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        if (key === "features") {
          formData.features.forEach((feature) => {
            formDataToSend.append("features", feature);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add createdBy
      formDataToSend.append("createdBy", userId);

      // Append images
      images.forEach((img) => {
        formDataToSend.append("images", img.file);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posters`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Property added successfully!");

        // RESET FORM
        setFormData({
          title: "",
          hoardingType: "",
          width: "",
          height: "",
          backlit: "",
          price: "",
          pincode: "",
          city: "",
          state: "",
          address: "",
          description: "",
          location: "",
          features: [],
        });

        setImages([]);
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      toast.error(error.response?.data?.message || "Failed to add property");
    }
  };

  // ===============================
  // CHECK USER VERIFICATION STATUS
  // ===============================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("ownerToken");
        if (!token) return;

        const decoded = decodeJWT(token);
        const id = decoded.id;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data;

        if (data.profileStatus === "Pending") {
          SetStatus("Pending");
          setPendingPopup(true);
        }
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // ===============================
  // AUTO-FILL CITY & STATE USING PINCODE
  // ===============================
  useEffect(() => {
    const fetchAddressFromPin = async () => {
      if (formData.pincode.length === 6) {
        try {
          const res = await axios.get(
            `https://api.postalpincode.in/pincode/${formData.pincode}`
          );
          const postOffice = res.data[0]?.PostOffice?.[0];

          if (postOffice) {
            setFormData((prev) => ({
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
  }, [formData.pincode]);

  // ===============================
  // UI
  // ===============================
  return (
    <>
      {pendingPopup && (
        <div className="popup-warning">
          <div className="popup-box">
            <p>Your profile verification request is pending.</p>
            <button onClick={() => setPendingPopup(false)}>OK</button>
          </div>
        </div>
      )}

      <div className="main-content w-100">
        <div className="main-content-inner">
          {/* ------------------ UPLOAD SECTION ------------------ */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">Upload Hoarding Images</h3>

            <div className="box-uploadfile text-center">
              <div className="uploadfile">
                <a className="tf-btn bg-color-primary pd-10 btn-upload mx-auto">
                  Select photos
                  <input
                    type="file"
                    multiple
                    onChange={handleImageSelect}
                    className="ip-file cursor-pointer"
                  />
                </a>
                <p className="file-name fw-5">
                  <span>(Up to 5 photos)</span>
                </p>
              </div>
            </div>

            <div className="box-img-upload">
              {images.map((img, index) => (
                <div className="item-upload file-delete" key={index}>
                  <Image alt="img" width={615} height={405} src={img.preview} />
                  <span
                    className="icon icon-trashcan1 remove-file"
                    onClick={() => removeImage(index)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ------------------ DETAILS SECTION ------------------ */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Hoarding Details</h5>

            <form className="box-info-property" onSubmit={handleSubmit}>
              {/* TITLE */}
              <fieldset className="box box-fieldset">
                <label>
                  Title<span>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter Hoarding Title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </fieldset>

              {/* TYPE / WIDTH / HEIGHT */}
              <div className="box grid-layout-3 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    Hoarding Type<span>*</span>
                  </label>
                  <DropdownSelect
                    options={[
                      "Select Type",
                      "Pole",
                      "Wall",
                      "Digital",
                      "Transit",
                    ]}
                    value={formData.hoardingType}
                    onChange={(val) =>
                      setFormData({ ...formData, hoardingType: val })
                    }
                  />
                </fieldset>

                <fieldset className="box box-fieldset">
                  <label>
                    Width (ft)<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="width"
                    className="form-control"
                    placeholder="Enter Width"
                    value={formData.width}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="box box-fieldset">
                  <label>
                    Height (ft)<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="height"
                    className="form-control"
                    placeholder="Enter Height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </fieldset>
              </div>

              {/* BACKLIT / PRICE */}
              <div className="box grid-layout-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    Backlit<span>*</span>
                  </label>

                  <DropdownSelect
                    options={["Select", "Yes", "No"]}
                    value={formData.backlit}
                    onChange={(val) =>
                      setFormData({ ...formData, backlit: val })
                    }
                  />
                </fieldset>

                <fieldset className="box-fieldset">
                  <label>
                    Price/Month<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter Price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </fieldset>
              </div>

              {/* PINCODE / CITY */}
              <div className="box grid-layout-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    Pincode<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    className="form-control"
                    placeholder="Enter Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="box-fieldset">
                  <label>
                    City<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    value={formData.city}
                    disabled={!!formData.city}
                  />
                </fieldset>
              </div>

              {/* STATE / ADDRESS */}
              <div className="box grid-layout-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    State<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    value={formData.state}
                    disabled={!!formData.state}
                  />
                </fieldset>

                <fieldset className="box-fieldset">
                  <label>
                    Address<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </fieldset>
              </div>

              {/* DESCRIPTION */}
              <fieldset className="box box-fieldset">
                <label>Description</label>
                <textarea
                  className="textarea"
                  name="description"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </fieldset>

              {/* LOCATION */}
              <div className="box box-fieldset">
                <label>
                  Map Location URL<span>*</span>
                </label>

                <div className="box-ip">
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* FEATURES */}
              <div className="widget-box-2 mb-20">
                <h5 className="title">
                  Features and Highlights<span>*</span>
                </h5>

                <div className="box-amenities-property">
                  <div className="box-amenities">
                    <div className="list-amenities">
                      {[
                        "Prime Location",
                        "Backlit Illumination",
                        "Carbon monoxide alarm",
                        "Target Audience Reach",
                      ].map((item) => (
                        <fieldset className="checkbox-item style-1" key={item}>
                          <label>
                            <span className="text-4">{item}</span>
                            <input
                              type="checkbox"
                              checked={formData.features.includes(item)}
                              onChange={() => handleCheckbox(item)}
                            />
                            <span className="btn-checkbox" />
                          </label>
                        </fieldset>
                      ))}
                    </div>
                  </div>

                  <div className="box-amenities">
                    <div className="list-amenities">
                      {[
                        "Clear Line of Sight",
                        "High Traffic Zone",
                        "Round-the-Clock Exposure",
                        "Large Display Size",
                      ].map((item) => (
                        <fieldset className="checkbox-item style-1" key={item}>
                          <label>
                            <span className="text-4">{item}</span>
                            <input
                              type="checkbox"
                              checked={formData.features.includes(item)}
                              onChange={() => handleCheckbox(item)}
                            />
                            <span className="btn-checkbox" />
                          </label>
                        </fieldset>
                      ))}
                    </div>
                  </div>

                  <div className="box-amenities">
                    <div className="list-amenities">
                      {[
                        "Durable Structure",
                        "Target Audience Reach",
                        "Weather Resistant",
                      ].map((item) => (
                        <fieldset className="checkbox-item style-1" key={item}>
                          <label>
                            <span className="text-4">{item}</span>
                            <input
                              type="checkbox"
                              checked={formData.features.includes(item)}
                              onChange={() => handleCheckbox(item)}
                            />
                            <span className="btn-checkbox" />
                          </label>
                        </fieldset>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="box-btn">
                <button
                  type="submit"
                  className="tf-btn bg-color-primary pd-13"
                  disabled={status}
                  style={{
                    opacity: status ? 0.6 : 1,
                    cursor: status ? "not-allowed" : "pointer",
                  }}
                >
                  Post Listing
                </button>

                <a
                  href="/owner-dashboard/my-property"
                  className="tf-btn style-border pd-10"
                >
                  Back
                </a>
              </div>
            </form>
          </div>

          {/* FOOTER */}
          <div className="footer-dashboard">
            <p>© {new Date().getFullYear()} My Hoardings</p>
            <ul className="list">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="overlay-dashboard" />
      </div>
      <ToastContainer />
    </>
  );
}
