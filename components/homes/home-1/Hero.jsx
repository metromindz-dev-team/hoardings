"use client";

import SearchForm from "@/components/common/SearchForm";
import { useState } from "react";
import { EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

const images = [
  { src: "/images/home/bnr-img2.webp", alt: "images"},
  { src: "/images/home/bnr-img1.webp", alt: "images" },
  { src: "/images/home/bnr-img3.webp", alt: "images" }
];

const pagiImages = [
  { src: "/images/home/thumbs/bnrImgThumb2.webp", alt: "images" },
  { src: "/images/home/thumbs/bnrImgThumb1.webp", alt: "images" },
  { src: "/images/home/thumbs/bnrImgThumb3.webp", alt: "images" }
];

export default function Hero() {
  const [swiperThumb1, setswiperThumb1] = useState(null);

  // State to track the active item
  const [activeItem, setActiveItem] = useState("For sale");

  // Array of items to render
  const items = ["For sale", "For rent"];

  return (
    <div className="page-title home08 bg-color-white hero-section">
      <div className="tf-slider style-2">
        <div className="position-relative">
          <Swiper
            dir="ltr"
            className="swiper hero-thumbs-2 "
            modules={[Thumbs, EffectFade, Navigation]}
            navigation={{
              prevEl: ".snbhp1",
              nextEl: ".snbhn1",
            }}
            effect="fade"
            thumbs={{ swiper: swiperThumb1 }}
          >
            {images.map((image, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <a
                  href={image.src}
                  data-fancybox="gallery"
                  className="image-wrap d-block"
                >
                  <Image
                    className="lazyload"
                    data-src={image.src}
                    alt={image.alt}
                    src={image.src}
                    width={1888}
                    height={940}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="content-inner">
            <div className="tf-container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="content">
                    <div className="heading">
                      <div className="text-display-2 title fw-7 text_white mb-20">
                        List. Discover. Advertise. <br/> Smarter Hoarding Management <br/> Starts Here.
                      </div>

                      <p className="text_white description text-1">
                        Easily list your available hoardings or find the perfect location for your next campaign.
                      </p>
                    </div>
                  </div>

                  <div className="wrap-btn d-flex gap-16 justify-center flex-wrap-sm pb-5">
                    <Link
                      className="tf-btn bg-color-primary rounded-cycle pd-23 h54"
                      href={`#`}
                    >
                      List Your Hoarding
                    </Link>
                    
                    <Link
                      className="tf-btn style-border rounded-cycle pd-23 height-3"
                      href={`/properties-grid`}
                      style={{color: "white", borderColor: "white"}}
                    >
                      Explore Available Spaces
                    </Link>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="content">
                    <div className="wrap-pagination-thumbs lg-hide">
                      <Swiper
                        dir="ltr"
                        className="swiper thumbs-sw-pagi"
                        spaceBetween={15}
                        slidesPerView={3}
                        onSwiper={setswiperThumb1}
                        modules={[Thumbs]}
                      >
                        {pagiImages.map((image, index) => (
                          <SwiperSlide className="swiper-slide" key={index}>
                            <div className="img-thumb-pagi">
                              <Image
                                alt={image.alt}
                                src={image.src}
                                width={196}
                                height={130}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      <div className="swiper-button-prev sw-button style-4 sw-thumbs-prev-2 snbhp1">
                        <div>
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 12H5"
                              stroke="#5C5E61"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5L5 12L12 19"
                              stroke="#5C5E61"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="swiper-button-next sw-button style-4 sw-thumbs-next-2 snbhn1">
                        <div>
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19"
                              stroke="#5C5E61"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5L19 12L12 19"
                              stroke="#5C5E61"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                   </div>
                  </div>
                </div>

                <div className="col-lg-12"> 
                  <div className="wg-filter">
                    <div className="form-title">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <fieldset>
                          <input
                            type="text"
                            placeholder="Search Hoardings by Categories, Locations . . ."
                          />
                        </fieldset>
                      </form>

                      <div className="box-item wrap-btn">
                        <a href="#" className="tf-btn bg-color-primary pd-3">
                          Search <i className="icon-MagnifyingGlass fw-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
