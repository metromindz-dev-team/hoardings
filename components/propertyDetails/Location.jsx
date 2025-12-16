// import React from "react";

// export default function Location({property}) {
//   const location = property.location;
//   return (
//     <>
//       <div className="wg-title text-11 fw-6 text-color-heading">
//         Get Direction
//       </div>

//       <iframe
//         className="map"
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.560713123458!2d77.5916379!3d13.063610199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d6f9cd4840b%3A0xba4c05660b9a5961!2sMetroMindz%20Software%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1757569577002!5m2!1sen!2sin"
//         style={{ border: 0 }}
//         allowFullScreen=""
//         loading="lazy"
//         referrerPolicy="no-referrer-when-downgrade"
//       />
//     </>
//   );
// }

import React from "react";
import "@/components/propertyDetails/sliders/Map.css";

export default function Location({ property }) {
  const iframeHTML = property?.location || "";

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Get Direction
      </div>

      <div
        className="map-iframe"
        dangerouslySetInnerHTML={{ __html: iframeHTML }}
      ></div>
    </>
  );
}
