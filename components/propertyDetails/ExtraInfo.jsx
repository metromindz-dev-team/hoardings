import React from "react";

export default function ExtraInfo({property}) {
  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Hoarding Details
      </div>
      
      <div className="content">
        {/* <p className="description text-1">
          This premium backlit billboard offers uninterrupted visibility round the clock, making it an excellent choice for brands that want to stay in the spotlight. The bright illumination enhances colors and graphics, ensuring your message stands out vividly even after sunset. Located in a high-traffic zone, it captures the attention of thousands of daily commuters and pedestrians. 
          Its large format and clear line of sight guarantee maximum impact and brand recall. Perfect for product launches, awareness campaigns, or long-term brand building
        </p> */}
        <p className="description text-1">
          {property.description}
        </p>
      </div>
    </>
  );
}
