"use client";
import React from "react";
import Image from "next/image";
import DropdownSelect from "../common/DropdownSelect";
export default function AddProperty() {
  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 mb-20">
          <h3 className="title">Upload Hoarding Images</h3>
          <div className="box-uploadfile text-center">
            <div className="uploadfile">
              <a
                href="#"
                className=" tf-btn bg-color-primary pd-10 btn-upload mx-auto"
              >
                <svg
                  width={21}
                  height={20}
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Select photos
                <input type="file" className="ip-file" />
              </a>
              <p className="file-name fw-5">
                <span>(Up to 5 photos)</span>
              </p>
            </div>
          </div>

          <div className="box-img-upload">
            <div className="item-upload file-delete">
              <Image
                alt="img"
                width={615}
                height={405}
                src="/images/home/house-db-1.jpg"
              />
              <span className="icon icon-trashcan1 remove-file" />
            </div>

            <div className="item-upload file-delete">
              <Image
                alt="img"
                width={615}
                height={405}
                src="/images/home/house-db-2.jpg"
              />
              <span className="icon icon-trashcan1" />
            </div>

            <div className="item-upload file-delete">
              <Image
                alt="img"
                width={615}
                height={405}
                src="/images/home/house-db-3.jpg"
              />
              <span className="icon icon-trashcan1 remove-file" />
            </div>

            <div className="item-upload file-delete">
              <Image
                alt="img"
                width={615}
                height={405}
                src="/images/home/house-db-4.jpg"
              />
              <span className="icon icon-trashcan1 remove-file" />
            </div>

            <div className="item-upload file-delete">
              <Image
                alt="img"
                width={615}
                height={405}
                src="/images/home/house-db-5.jpg"
              />
              <span className="icon icon-trashcan1 remove-file" />
            </div>
          </div>
        </div>

        <div className="widget-box-2 mb-20">
          <h5 className="title">Hoarding Details</h5>
          <form
            className="box-info-property"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="box box-fieldset">
              <label htmlFor="title">
                Title<span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Hoarding Title"
              />
            </fieldset>

            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="country">
                  Hoarding Type<span>*</span>
                </label>

                <DropdownSelect
                  options={["Select Type", "Digital", "Pole", "Billboard", "Vehicle"]}
                  addtionalParentClass=""
                />
              </fieldset>

              <fieldset className="box box-fieldset">
                <label htmlFor="title">
                  Hoarding Width(ft)<span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Hoarding Width(ft)"
                />
              </fieldset>

              <fieldset className="box box-fieldset">
                <label htmlFor="title">
                  Hoarding Height(ft)<span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Hoarding Height(ft)"
                />
              </fieldset>
            </div>

            <div className="box grid-layout-2 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="country">
                  Backlit<span>*</span>
                </label>

                <DropdownSelect
                  options={["Select", "Yes", "No"]}
                  addtionalParentClass=""
                />
              </fieldset>

              <fieldset className="box-fieldset mb-30">
                  <label htmlFor="price">
                    Price (per Month)<span>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Hoarding Price/Month"
                  />
              </fieldset>
            </div>
            
            <div className="box grid-layout-2 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="address">
                  Address<span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                />
              </fieldset>

              <fieldset className="box-fieldset">
                <label htmlFor="state">
                  City<span>*</span>
                </label>

                <DropdownSelect
                  options={["Select City", "Chennai", "Hyderabad", "Kochi", "Panaji", "Bengaluru"]}
                  addtionalParentClass=""
                />
              </fieldset>
            </div>

            <div className="box grid-layout-2 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="state">
                  State/Province<span>*</span>
                </label>

                <DropdownSelect
                  options={["Select State/Province", "Tamil Nadu", "Karnataka", "Kerela", "Goa", "New Delhi"]}
                  addtionalParentClass=""
                />
              </fieldset>

              <fieldset className="box-fieldset">
                <label htmlFor="zip">
                  Pincode<span>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Pincode"
                />
              </fieldset>
            </div>
          
            <fieldset className="box box-fieldset">
              <label htmlFor="desc">Description</label>
              <textarea
                className="textarea"
                placeholder="Enter Hoarding Description"
                defaultValue={""}
              />
            </fieldset>

            <div className="box box-fieldset">
              <label htmlFor="location">
                Location (Map Embed URL)<span>*</span>
              </label>
              <div className="box-ip">
                <input
                  type="url"
                  className="form-control"
                  defaultValue="None"
                />
                <a href="#" className="btn-location">
                  <i className="icon icon-location" />
                </a>
              </div>
            </div>
          </form>
        </div>

        <div className="widget-box-2 mb-20">
          <h5 className="title">
            Features and Highlights<span>*</span>
          </h5>

          <div className="box-amenities-property">
            <div className="box-amenities">
              <div className="list-amenities">
                <fieldset className="checkbox-item  style-1  ">
                  <label>
                    <span className="text-4">Prime Location</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Backlit Illumination</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Carbon monoxide alarm</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Target Audience Reach</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>
              </div>
            </div>

            <div className="box-amenities">
              <div className="list-amenities">
                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Clear Line of Sight</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">High Traffic Zone</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Round-the-Clock Exposure</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Large Display Size</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>
              </div>
            </div>

            <div className="box-amenities">
              <div className="list-amenities">
                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Durable Structure</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Target Audience Reach</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>

                <fieldset className="checkbox-item style-1  ">
                  <label>
                    <span className="text-4">Weather Resistant</span>
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div className="box-btn">
          <a href="#" className="tf-btn bg-color-primary pd-13">
            Post Listing
          </a>

          <a href="/my-property" className="tf-btn style-border pd-10">
            Back
          </a>
        </div>

        {/* .footer-dashboard */}
          <div className="footer-dashboard">
            <p>Copyright © {new Date().getFullYear()} My Hoardings</p>
            <ul className="list">
              <li>
                <a href="#">Privacy Policy</a>
              </li>

              <li>
                <a href="#">Terms and Conditions</a>
              </li>
            </ul>
          </div>
        {/* /.footer-dashboard */}
      </div>

      <div className="overlay-dashboard" />
    </div>
  );
}
