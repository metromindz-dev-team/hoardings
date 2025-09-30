"use client";

import Link from "next/link";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { properties } from "@/data/properties";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Properties() {
  return (
    <section className="section-listing tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center ">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Find Your Ad Space" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Discover, compare, and book advertising spaces directly from verified owners.
              </p>
            </div>

            <div
              dir="ltr"
              className="swiper style-pagination tf-sw-mobile-1 sw-swiper-767"
              data-screen={767}
              data-preview={1}
              data-space={15}
            >
              <div className="swiper-wrapper tf-layout-mobile-md md-col-2  lg-col-3 ">
                {properties.map((property, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="box-house hover-img ">
                      <div className="image-wrap">
                        <Link href={`/property-detail-v1/${property.id}`}>
                          <Image
                            className="lazyload"
                            alt=""
                            src={property.imageSrc}
                            width={600}
                            height={401}
                          />
                        </Link>

                        <ul className="box-tag flex gap-8 ">
                          <li className="flat-tag text-4 bg-main fw-6 text_white">
                            {property.days} Days Ago
                          </li>
                        </ul>
                      </div>
                      
                      <div className="content">
                        <h5 className="price">
                            ₹{property.price.toLocaleString()}
                        </h5>

                        <h5 className="title">
                          <Link href={`/property-detail-v1/${property.id}`}>
                            {property.title}
                          </Link>
                        </h5>

                        <p className="location text-1 line-clamp-1 ">
                          <i className="icon-location" /> {property.location}
                        </p>

                        <ul className="meta-list flex">
                          <li className="text-1 flex">
                            <span>{property.size}</span>
                          </li>
                        </ul>

                        <div className="bot flex justify-between items-center">
                          

                          <div className="wrap-btn flex">
                            <Link
                              href={`/property-detail-v1/${property.id}`}
                              className="tf-btn style-border pd-4"
                            >
                              View Details
                            </Link>

                            <Link
                              href={`/property-detail-v1/${property.id}`}
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

              <Link href={"/contact"} className="mt-5 d-flex justify-content-center">
                <button
                  className="tf-btn bg-color-primary fw-7 mx-auto btn-loadmore view-more-button p-5"
                >
                  View More
                </button>
              </Link>

              {/* <div className="sw-pagination sw-pagination-mb-1 text-center d-lg-none d-block" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
