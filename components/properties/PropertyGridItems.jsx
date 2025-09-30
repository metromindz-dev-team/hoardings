
import { properties } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PropertyGridItems({ showItems = properties.length }) {
  return (
    <>
      {properties.map((property, i) => (
        <div key={i} className="swiper-slide">
          <div className="box-house hover-img ">
            <div className="image-wrap">
              <Link href={`/property-detail-v2/${property.id}`}>
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
                <Link href={`/property-detail-v2/${property.id}`}>
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
                    href={`/property-detail-v2/${property.id}`}
                    className="tf-btn style-border pd-4"
                  >
                    View Details
                  </Link>

                  <Link
                    href={`/property-detail-v2/${property.id}`}
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
