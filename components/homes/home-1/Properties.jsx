"use client";

import Link from "next/link";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Properties() {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculate Days Ago from createdAt
  const getDaysAgo = (date) => {
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
    <section className="section-listing tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            {/* Heading */}
            <div className="heading-section text-center">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Find Your Ad Space" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Discover, compare, and book advertising spaces directly from
                verified owners.
              </p>
            </div>

            {/* ---------------- Loading State ---------------- */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading hoardings...</p>
              </div>
            )}

            {/* ---------------- Empty State ---------------- */}
            {!loading && posters.length === 0 && (
              <div className="text-center py-5">
                <h5>No Hoardings Available</h5>
                <p>Please check again later.</p>
              </div>
            )}

            {/* ---------------- Posters Listing ---------------- */}
            <div
              dir="ltr"
              className="swiper style-pagination tf-sw-mobile-1 sw-swiper-767"
              data-screen={767}
              data-preview={1}
              data-space={15}
            >
              <div className="swiper-wrapper tf-layout-mobile-md md-col-2 lg-col-3">
                {!loading &&
                  posters.length > 0 &&
                  posters.map((property, i) => (
                    <div key={i} className="swiper-slide">
                      {/* MAIN CARD */}
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
                              width={500}
                              height={300}
                              className="w-100"
                              style={{
                                height: "250px",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "10px",
                              }}
                            />
                          </Link>

                          <ul className="box-tag flex gap-8">
                            <li className="flat-tag text-4 bg-main fw-6 text_white">
                              {getDaysAgo(property.createdAt)}
                            </li>
                          </ul>
                        </div>

                        {/* CONTENT */}
                        <div className="content flex-grow-1 d-flex flex-column">
                          {/* Top part */}
                          <div>
                            <h5 className="title">
                              <Link
                                href={`/property-detail-v2/${property._id}`}
                              >
                                {property.title}
                              </Link>
                            </h5>

                            <p className="location text-1 line-clamp-1">
                              <i className="icon-location" /> {property.address}
                            </p>
                            <h5 className="price mb-2">
                              ₹{property.price.toLocaleString()}
                            </h5>

                            <ul className="meta-list flex">
                              <li className="text-1 flex">
                                <span>{property.width}ft * {property.height}ft</span>
                              </li>
                            </ul>
                          </div>

                          {/* BUTTONS ALWAYS AT BOTTOM */}
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
              </div>

              {/* View More Button */}
              <Link
                href={"/properties-grid"}
                className="mt-5 d-flex justify-content-center"
              >
                <button className="tf-btn bg-color-primary fw-7 mx-auto btn-loadmore view-more-button p-5">
                  View More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
