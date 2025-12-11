"use client";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";

import Details2 from "@/components/propertyDetails/Details2";
import RelatedProperties from "@/components/propertyDetails/RelatedProperties";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Prevents fetch before params load

    const fetchPosterByID = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posters/${id}`
        );
        if (res.status === 200) {
          setPoster(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch poster:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosterByID();
  }, [id]);

  // Show loading screen
  if (loading) {
    return (
      <div id="wrapper">
        <Header1 />
        <Breadcumb pageName="Hoarding Details" />
        <div className="main-content" style={{ padding: 50, textAlign: "center" }}>
          <h3>Loading...</h3>
        </div>
        <Footer1 />
      </div>
    );
  }

  // Show "Not Found"
  if (!poster) {
    return (
      <div id="wrapper">
        <Header1 />
        <Breadcumb pageName="Hoarding Details" />
        <div className="main-content" style={{ padding: 50, textAlign: "center" }}>
          <h3>Hoarding not found</h3>
        </div>
        <Footer1 />
      </div>
    );
  }

  // Show actual property
  return (
    <div id="wrapper">
      <Header1 />
      <Breadcumb pageName="Hoarding Details" />
      <div className="main-content">
        <Details2 property={poster} />
        <RelatedProperties />
        <Cta />
      </div>
      <Footer1 />
    </div>
  );
}
