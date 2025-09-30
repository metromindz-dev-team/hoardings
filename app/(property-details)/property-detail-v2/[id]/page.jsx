
// import Footer1 from "@/components/footers/Footer1";
// import Header1 from "@/components/headers/Header1";
// import Breadcumb from "@/components/common/Breadcumb";
// import Cta from "@/components/common/Cta";

// import Details2 from "@/components/propertyDetails/Details2";
// import RelatedProperties from "@/components/propertyDetails/RelatedProperties";

// import React from "react";

// export const metadata = {
//   title: "Hoarding Details Page",
//   description: "",
// };

// const allProperties = [
//   {
//     id: "1",
//     title: "Premium Hoarding",
//     location: "MG Road, Bengaluru",
//     price: "₹50,000/month",
//     size: "2000 ft x 1000 ft",
//     image: "/images/section/detail-img1.webp",
//   }
// ];

// export async function generateStaticParams() {
//   return allProperties.map((property) => ({
//     id: property.id.toString(),
//   }));
// }

// export default async function Page({ params }) {
//   const { id } = params;

//   const property =
//     allProperties.find((elm) => elm.id.toString() === id) || allProperties[0];

//   return (
//     <div id="wrapper">
//       <Header1 />
//       <Breadcumb pageName="Hoarding Details" />
//       <div className="main-content">
//         <Details2 property={property} />
//         <RelatedProperties />
//         <Cta />
//       </div>
//       <Footer1 />
//     </div>
//   );
// }



import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";

import Details2 from "@/components/propertyDetails/Details2";
import RelatedProperties from "@/components/propertyDetails/RelatedProperties";

export const metadata = {
  title: "Hoarding Details Page",
  description: "Explore details of premium hoardings and advertising spaces.",
};

// ✅ Dummy data (add more items here)
const allProperties = [
  {
    id: "1",
    title: "Premium Hoarding",
    location: "MG Road, Bengaluru",
    price: "₹50,000/month",
    size: "40 ft x 20 ft",
    image: "/images/section/detail-img1.webp",
    description:
      "This premium hoarding is located in a high-traffic zone at MG Road, Bengaluru.",
  }
];

// ✅ Generate static paths for all IDs
export async function generateStaticParams() {
  return allProperties.map((property) => ({
    id: property.id,
  }));
}

// ✅ Page Component
export default function Page({ params }) {
  const { id } = params;

  const property =
    allProperties.find((elm) => elm.id.toString() === id) || allProperties[0];

  return (
    <div id="wrapper">
      <Header1 />
      <Breadcumb pageName="Hoarding Details" />
      <div className="main-content">
        <Details2 property={property} />
        <RelatedProperties />
        <Cta />
      </div>
      <Footer1 />
    </div>
  );
}





