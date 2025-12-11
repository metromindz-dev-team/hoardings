"use client";

import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import BrandSlider from "@/components/common/BrandSlider";

export default function Partners() {
  return (
    <section className="section-work-together mt-5 pt-5">
      <div className="wg-partner  tf-spacing-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section  text-center mb-48">
                <h2 className="title text_white split-text effect-right">
                  <SplitTextAnimation text="Brands Advertising on Our Platform" />
                </h2>
                <p
                  className="text-1 text_white wow animate__fadeInUp animate__animated"
                  data-wow-duration="1.5s"
                >
                  Where leading brands find their perfect hoarding space.
                </p>
              </div>

              <BrandSlider />
            </div>
          </div>
        </div>
      </div>

      <div className="wg-appraisal ">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div className="heading-section mb-30">
                  <h2 className="title split-text effect-right">
                    <SplitTextAnimation text="List Your Space Now or" />
                    <br />
                    <SplitTextAnimation text="Start Advertising" />
                  </h2>

                  <p
                    className="text-1 split-text split-lines-transform"
                    data-wow-duration="1.5s"
                  >
                    List your hoarding or find the perfect space to advertise.
                  </p>
                </div>

                <form  id="sib-form">
                  <div className="sib-form-block ">
                    <div className="sib-text-form-block">
                      <p className="text-1">
                        Stay updated on new listings and campaigns
                      </p>
                    </div>
                  </div>

                  <div className="sib-input sib-form-block mb-11 mt-3">
                    <div className="form__entry entry_block">
                      <div className="form__label-row mb-10">
                        <fieldset className="entry__field">
                          <input
                            className="input input-nl"
                            type="text"
                            id="subscribeEmail"
                            name="email"
                            autoComplete="off"
                            placeholder="Your Email Address"
                            data-required="true"
                            required
                          />
                        </fieldset>
                      </div>
                      <label className="  entry__error entry__error--primary"></label>
                    </div>
                  </div>

                  <div className="sib-form-block pt-2">
                    <button
                      className="sib-form-block__button sib-form-block__button-with-loader tf-btn bg-color-primary  w-full"
                      form="sib-form"
                      type="submit"
                    >
                      <svg
                        className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                        viewBox="0 0 512 512"
                      >
                        <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                      </svg>
                      Subscribe
                    </button>
                  </div>
                </form>

                <div
                  className="person wow animate__fadeInRight animate__animated"
                  data-wow-duration="2s"
                >
                  <Image
                    alt=""
                    src="/images/home/btmBnr.webp"
                    width={380}
                    height={800}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
