"use client";
import React from "react";
import EnquiryPoster from "@/components/owner-dashboard/EnquiryPoster";
import { useParams } from "next/navigation";

export default function Page() {
      const { id } = useParams();
      
  return (
    <>
      <EnquiryPoster posterId={id} />
    </>
  );
}
