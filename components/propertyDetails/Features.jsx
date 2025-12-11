// import React from "react";

// export default function Features({property}) {
//   return (
//     <>
//       <div className="wg-title text-11 fw-6 text-color-heading">
//         Features and Highlights
//       </div>
//       <div className="wrap-feature">
//         <div className="box-feature">
//           <ul>
//             <li className="feature-item">Prime Location</li>
//             <li className="feature-item">Backlit Illumination</li>
//             <li className="feature-item">Target Audience Reach</li>
//           </ul>
//         </div>

//         <div className="box-feature">
//           <ul>
//             <li className="feature-item">Clear Line of Sight</li>
//             <li className="feature-item">High Traffic Zone</li>
//             <li className="feature-item">Round-the-Clock Exposure</li>
//           </ul>
//         </div>

//         <div className="box-feature">
//           <ul>
//             <li className="feature-item">Large Display Size</li>
//             <li className="feature-item">Durable Structure</li>
//             <li className="feature-item">Weather Resistant</li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";

export default function Features({ property }) {
  const features = property?.features || [];

  // Split features into 3 equal groups
  const chunkSize = Math.ceil(features.length / 3);
  const col1 = features.slice(0, chunkSize);
  const col2 = features.slice(chunkSize, chunkSize * 2);
  const col3 = features.slice(chunkSize * 2);

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Features and Highlights
      </div>

      <div className="wrap-feature">
        {/* Column 1 */}
        <div className="box-feature">
          <ul>
            {col1.map((item, index) => (
              <li key={index} className="feature-item">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className="box-feature">
          <ul>
            {col2.map((item, index) => (
              <li key={index} className="feature-item">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="box-feature">
          <ul>
            {col3.map((item, index) => (
              <li key={index} className="feature-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

