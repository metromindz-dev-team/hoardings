"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import DropdownSelect from "../common/DropdownSelect";
import { toast, ToastContainer } from "react-toastify";

export default function EditProperty({ propertyId }) {
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
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;

    const fetchProperty = async () => {
      try {
        const token = Cookies.get("ownerToken");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posters/${propertyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data;
        setFormData({
          title: data.title || "",
          hoardingType: data.hoardingType || "",
          width: data.width?.toString() || "",
          height: data.height?.toString() || "",
          backlit: data.backlit === true ? "Yes" : "No",
          price: data.price?.toString() || "",
          pincode: data.pincode?.toString() || "",
          city: data.city || "",
          state: data.state || "",
          address: data.address || "",
          description: data.description || "",
          location: data.location || "",
          features: Array.isArray(data.features) ? data.features : [],
        });

        setExistingImages(Array.isArray(data.image) ? data.image : []);
      } catch (error) {
        console.error("Error fetching property:", error);
        alert("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages =
      existingImages.length -
      removedImages.length +
      images.length +
      files.length;

    if (totalImages > 5) {
      alert("You can upload up to 5 images.");
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

  const removeNewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageUrl) => {
    setRemovedImages([...removedImages, imageUrl]);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("ownerToken");
      if (!token) {
        alert("Please login first");
        return;
      }

      const formDataToSend = new FormData();

      // send form fields
      Object.keys(formData).forEach((key) => {
        if (key === "features") {
          formData.features.forEach((feature) =>
            formDataToSend.append("features", feature)
          );
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // 1️⃣ PREPARE EXISTING IMAGES AFTER REMOVAL
      const filteredExistingImages = existingImages.filter(
        (img) => !removedImages.includes(img)
      );

      formDataToSend.append(
        "existingImages",
        JSON.stringify(filteredExistingImages)
      );

      // 2️⃣ SEND REMOVED IMAGES
      formDataToSend.append("removedImages", JSON.stringify(removedImages));

      // 3️⃣ SEND NEW IMAGES
      images.forEach((img) => {
        formDataToSend.append("images", img.file);
      });

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posters/${propertyId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Updated successfully!");
      setTimeout(() => {
        window.location.href = "/owner-dashboard/my-property";
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner" style={{ padding: 40 }}>
          <h3>Loading property details...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-content w-100">
        <div className="main-content-inner">
          <div className="widget-box-2 mb-20">
            <h3 className="title">Upload Hoarding Images</h3>

            <div className="box-uploadfile text-center">
              <div className="uploadfile">
                <a className="tf-btn bg-color-primary pd-10 btn-upload mx-auto">
                  Select photos
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="ip-file cursor-pointer"
                  />
                </a>
                <p className="file-name fw-5">
                  <span>(Up to 5 photos)</span>
                </p>
              </div>
            </div>

            <div className="box-img-upload">
              {existingImages
                .filter((img) => !removedImages.includes(img))
                .map((img, index) => (
                  <div
                    className="item-upload file-delete"
                    key={`existing-${index}`}
                  >
                    <img alt="img" width={615} height={405} src={img} />
                    <span
                      className="icon icon-trashcan1 remove-file"
                      onClick={() => removeExistingImage(img)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}

              {images.map((img, index) => (
                <div className="item-upload file-delete" key={index}>
                  <Image alt="img" width={615} height={405} src={img.preview} />
                  <span
                    className="icon icon-trashcan1 remove-file"
                    onClick={() => removeNewImage(index)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="widget-box-2 mb-20">
              <h5 className="title">Hoarding Details</h5>

              <fieldset className="box box-fieldset">
                <label>
                  Title<span>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Hoarding Title"
                  required
                />
              </fieldset>

              <div className="box grid-layout-3 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    Hoarding Type<span>*</span>
                  </label>
                  {/* <DropdownSelect
                  options={["Pole", "Wall", "Digital", "Transit"]}
                  value={formData.hoardingType}
                  onChange={(val) =>
                    setFormData({ ...formData, hoardingType: val })
                  }
                /> */}
                  <select
                    className="form-control p-4 rounded-5 text-4"
                    value={formData.hoardingType}
                    onChange={(e) =>
                      setFormData({ ...formData, hoardingType: e.target.value })
                    }
                  >
                    <option value="Pole">Pole</option>
                    <option value="Wall">Wall</option>
                    <option value="Digital">Digital</option>
                    <option value="Transit">Transit</option>
                  </select>
                </fieldset>

                <fieldset className="box box-fieldset">
                  <label>
                    Hoarding Width(ft)<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Width"
                    required
                  />
                </fieldset>

                <fieldset className="box box-fieldset">
                  <label>
                    Hoarding Height(ft)<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Height"
                    required
                  />
                </fieldset>
              </div>

              <div className="box grid-layout-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    Backlit<span>*</span>
                  </label>

                  <DropdownSelect
                    options={["Yes", "No"]}
                    value={formData.backlit}
                    onChange={(val) =>
                      setFormData({ ...formData, backlit: val })
                    }
                  />
                </fieldset>

                <fieldset className="box-fieldset">
                  <label>
                    Price (per Month)<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Price"
                    required
                  />
                </fieldset>
              </div>

              <div className="box grid-layout-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    Address<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Address"
                    required
                  />
                </fieldset>

                <fieldset className="box-fieldset">
                  <label>
                    Pincode<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Pincode"
                    required
                  />
                </fieldset>
              </div>

              <div className="box grid-layout-2 gap-30">
                <fieldset className="box-fieldset">
                  <label>
                    City<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter City"
                    required
                  />
                </fieldset>

                <fieldset className="box-fieldset">
                  <label>
                    State<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter State"
                    required
                  />
                </fieldset>
              </div>

              <fieldset className="box box-fieldset">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="Enter Hoarding Description"
                />
              </fieldset>

              <fieldset className="box box-fieldset">
                <label>
                  Location (Map Embed URL)<span>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Map URL"
                  required
                />
              </fieldset>
            </div>

            <div className="widget-box-2 mb-20">
              <h5 className="title">Features and Highlights</h5>
              <div className="box-amenities-property">
                {[
                  "Prime Location",
                  "Backlit Illumination",
                  "Carbon monoxide alarm",
                  "Target Audience Reach",
                  "Clear Line of Sight",
                  "High Traffic Zone",
                  "Round-the-Clock Exposure",
                  "Large Display Size",
                  "Durable Structure",
                  "Weather Resistant",
                ].map((feature) => (
                  <fieldset key={feature} className="checkbox-item style-1">
                    <label>
                      <span className="text-4">{feature}</span>
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureChange(feature)}
                      />
                      <span className="btn-checkbox" />
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>

            <div className="box-btn">
              <button type="submit" className="tf-btn bg-color-primary pd-13">
                Update Listing
              </button>
              <a
                href="/owner-dashboard/my-property"
                className="tf-btn style-border pd-10"
              >
                Back
              </a>
            </div>
          </form>

          <div className="footer-dashboard">
            <p>Copyright © {new Date().getFullYear()} My Hoardings</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
