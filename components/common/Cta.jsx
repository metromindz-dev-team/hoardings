import React from "react";
import Image from "next/image";

export default function Cta() {
  return (
    <section className="section-CTA">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="content-inner">
              <Image
                alt=""
                src="/images/section/footer-cta.webp"
                width={216}
                height={312}
              />
              <div className="content">
                <h4 className="text_white mb-8">
                  Find the Perfect Hoarding Location Today
                </h4>

                <p className="text_white text-1">
                  Advertise your brand or rent your space for maximum value.
                </p>
              </div>

              <a href="/contact" className="tf-btn style-2 fw-6">
                Contact our Experts
                <i className="icon-MagnifyingGlass fw-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
