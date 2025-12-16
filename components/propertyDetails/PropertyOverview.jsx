import React from "react";

export default function PropertyOverview({ property }) {
  return (
    <>
      <div className="heading flex justify-between">
        <div>
          <div className="title text-5 fw-6 text-color-heading">
            {property.title}
          </div>
          <div style={{ fontSize: '20px', marginTop: '4px'}}>Posted By: {property?.createdBy?.fullName}</div>
        </div>

        <div className="price text-5 fw-6 text-color-heading">
          ₹{property.price.toLocaleString()}{" "}
          <span className="h5 lh-30 fw-4 text-color-default"></span>
        </div>
      </div>

      <div className="info flex justify-between">
        <div className="feature">
          <p className="location text-1 flex items-center gap-10">
            <i className="icon-location" />
            {property.address}, {property.city}, {property.state},{" "}
            {property.pincode}
          </p>
        </div>
      </div>

      <div className="info-detail">
        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-SlidersHorizontal" />
            </div>

            <div className="content">
              <div className="text-4 text-color-default">Type:</div>
              <div className="text-1 text-color-heading">
                {property.hoardingType}
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Ruler" />
            </div>

            <div className="content">
              <div className="text-4 text-color-default">Size:</div>
              <div className="text-1 text-color-heading">
                {property.width} ft x {property.height} ft
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Garage-1" />
            </div>

            <div className="content">
              <div className="text-4 text-color-default">Backlit:</div>
              <div className="text-1 text-color-heading">
                {property.backlit === true ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-box">
          <div className="box-icon">
            <div className="icons">
              <i className="icon-Crop" />
            </div>

            <div className="content">
              <div className="text-4 text-color-default">Area:</div>
              <div className="text-1 text-color-heading">
                {property.hoardingArea.toLocaleString()} SqFt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <a href="#" className="tf-btn bg-color-primary pd-21 fw-6">
        Book This Space
      </a> */}
    </>
  );
}
