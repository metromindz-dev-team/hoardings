"use client";
import { properties } from "@/data/properties";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PropertyGridItems({ showItems = properties.length }) {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  // Calculate Days Ago
  const getDaysAgo = (date) => {
    if (!date) return "N/A";

    const created = new Date(date);
    const now = new Date();

    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 Day Ago";
    return `${diffDays} Days Ago`;
  };

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posters/`
        );

        if (res.status === 200) {
          setPosters(res.data);
        }
      } catch (error) {
        console.error("Error fetching posters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);
  return (
    <>
      {posters.map((property, i) => (
        <div key={i} className="swiper-slide">
          {/* CARD WRAPPER */}
          <div
            className="box-house hover-img h-100 d-flex flex-column"
            style={{ height: "100%" }}
          >
            {/* IMAGE */}
            <div className="image-wrap">
              <Link href={`/property-detail-v2/${property._id}`}>
                <Image
                  src={property.image[0]}
                  alt={property.title}
                  width={600}
                  height={400}
                  className="w-100"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Link>

              <ul className="box-tag flex gap-8">
                <li className="flat-tag text-4 bg-main fw-6 text_white">
                  {property.createdAt
                    ? getDaysAgo(property.createdAt)
                    : `${property.days} Days Ago`}
                </li>
              </ul>
            </div>

            {/* CONTENT */}
            <div className="content flex-grow-1 d-flex flex-column">
              {/* Top Section */}
              <div>
                {/* <h5 className="price">₹{property.price.toLocaleString()}</h5> */}

                <h5 className="title">
                  <Link href={`/property-detail-v2/${property._id}`}>
                    {property.title}
                  </Link>
                </h5>

                <p className="location text-1 line-clamp-1">
                  <i className="icon-location" /> {property.address}
                </p>
                <h5 className="price mb-2">₹{property.price.toLocaleString()}</h5>
                <ul className="meta-list flex">
                  <li className="text-1 flex">
                   <span>{`${property.width} ft × ${property.height} ft`}</span>
                  </li>
                </ul>
              </div>

              {/* BOTTOM BUTTONS FIXED */}
              <div className="bot flex justify-between mt-auto pt-3">
                <div className="wrap-btn flex justify-between">
                  <Link
                    href={`/property-detail-v2/${property._id}`}
                    className="tf-btn style-border pd-4"
                  >
                    View Details
                  </Link>

                  <Link
                    href={`/property-detail-v2/${property._id}`}
                    className="tf-btn style-border pd-4"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
