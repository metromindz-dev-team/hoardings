import React from "react";

export default function Features() {
  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Features and Highlights
      </div>
      <div className="wrap-feature">
        <div className="box-feature">
          <ul>
            <li className="feature-item">Prime Location</li>
            <li className="feature-item">Backlit Illumination</li>
            <li className="feature-item">Target Audience Reach</li>
          </ul>
        </div>

        <div className="box-feature">
          <ul>
            <li className="feature-item">Clear Line of Sight</li>
            <li className="feature-item">High Traffic Zone</li>
            <li className="feature-item">Round-the-Clock Exposure</li>
          </ul>
        </div>

        <div className="box-feature">
          <ul>
            <li className="feature-item">Large Display Size</li>
            <li className="feature-item">Durable Structure</li>
            <li className="feature-item">Weather Resistant</li>
          </ul>
        </div>
      </div>
    </>
  );
}
