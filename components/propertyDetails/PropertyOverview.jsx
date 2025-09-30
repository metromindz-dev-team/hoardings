import React from "react";

export default function PropertyOverview({ property }) {
  return (
    <>
      <div className="heading flex justify-between">
        <div className="title text-5 fw-6 text-color-heading">
          {property.title}
        </div>

        <div className="price text-5 fw-6 text-color-heading">
          ₹50,000{" "}
          <span className="h5 lh-30 fw-4 text-color-default">/month</span>
        </div>
      </div>

      <div className="info flex justify-between">
        <div className="feature">
          <p className="location text-1 flex items-center gap-10">
            <i className="icon-location" />
            #56 G Block, Sahakar Nagar, Bengaluru 560092
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
              <div className="text-1 text-color-heading">Billboard</div>
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
              <div className="text-1 text-color-heading">2000 ft x 1000 ft</div>
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
              <div className="text-1 text-color-heading">Yes</div>
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
              <div className="text-1 text-color-heading">2,000,000 SqFt</div>
            </div>
          </div>
        </div>
      </div>

      <a href="#" className="tf-btn bg-color-primary pd-21 fw-6">
        Book This Space
      </a>
    </>
  );
}
