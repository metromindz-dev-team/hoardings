"use client"
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";

const iconBoxes = [
  {
    id: 1,
    iconClass: "icon-agent-2",
    title: "For Hoarding Owners",
    heading: "Monetize Your Space — Get Discovered by Top Brands",
    li1: "- Easy listing process",
    li2: "- Visibility to major advertisers",
    li3: "- Only pay for listing",
    linkText: "Start Listing Now",
  },
  {
    id: 2,
    iconClass: "icon-location-4",
    title: " For Agencies & Advertisers",
    heading: " Find the Right Hoarding — Without the Hassle",
    li1: "- Verified hoarding data",
    li2: "- Smart filters & map view",
    li3: "- Internal tracking tools for your campaigns",
    linkText: "Explore Locations",
  }
];

export default function Banners () {
  return (
    <section className="section-help tf-spacing-1 pb-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Tailored Solutions for Owners & Advertisers" />
              </h2>
              <p
                className="text-1 wow animate__fadeInUp animate__animated"
                data-wow-duration="1.5s"
                data-wow-delay="0s"
              >
                Whether you own hoardings or need them for campaigns — we’ve got you covered.
              </p>
            </div>

            <div className="tf-grid-layout md-col-2 mb-6">
              {iconBoxes.map((box) => (
                <div
                  key={box.id}
                  className="icons-box style-3 wow animate__zoomIn animate__animated"
                  data-wow-duration="1.5s"
                  data-wow-delay="0s"
                >
                  <div className="tf-icon">
                    <i className={box.iconClass} />
                  </div>

                  <div className="content">
                    <h5 className="title">
                      <a href="#">{box.title}</a>
                    </h5>

                    <p className="text-1">{box.li1}</p>
                    <p className="text-1">{box.li2}</p>
                    <p className="text-1">{box.li3}</p>

                    <a href="#" className="tf-btn-link color-3">
                      <span>{box.linkText}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="item text-center">
        <Image
          alt=""
          width={1875}
          height={153}
          src="/images/section/section-help.png"
        />
      </div>
    </section>
  );
}
