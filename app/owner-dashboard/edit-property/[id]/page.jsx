"use client"

import EditProperty from "@/components/owner-dashboard/EditProperty";
import { useParams } from "next/navigation";
import React from "react";

// export const metadata = {
//   title: "",
//   description: "",
// };
export default function page() {
  const params = useParams();
  const { id } = params;


  return (
    <>
      <EditProperty propertyId={id} />
    </>
  );
}
