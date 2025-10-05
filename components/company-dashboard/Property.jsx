"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownSelect from "../common/DropdownSelect";
import { properties, properties5 } from "@/data/properties";

export default function Property() {
  return (
    <div className="main-content w-100">
      <div className="main-content-inner wrap-dashboard-content">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="row mt-5">
          <div className="col-lg-3 col-md-3 col-12">
            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset className="box-fieldset">
                <label>
                  Status{" "}
                </label>

                <DropdownSelect
                  options={["Select Status", "Booked", "Expired"]}
                  addtionalParentClass=""
                />
              </fieldset>
            </form>
          </div>

          <div className="col-lg-5 col-md-6 col-12">
            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset className="box-fieldset">
                <label>
                  {" "}
                  Search{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search . . ."
                />
              </fieldset>
            </form>
          </div>

          <div className="col-lg-2 col-md-2 col-12">
            <div className="box mt-5">
              <a href="#" className="tf-btn bg-color-primary pd-10">
                Reset
              </a>
            </div>
          </div>
        </div>

        <div className="widget-box-2 wd-listing mt-20">
          <h3 className="title">Listings</h3>
          <div className="wrap-table">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Listing Details</th>
                    <th>Listing Date</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {properties.map((property, i) => (
                    <tr key={i} className="file-delete">
                      <td>
                        <div className="listing-box">
                          <div className="images">
                            <Image
                              alt="images"
                              src={property.imageSrc}
                              width={615}
                              height={405}
                            />
                          </div>

                          <div className="content">
                            <div className="title">
                              <Link
                                href={`/property-detail-v2/1`}
                                className="link"
                              > 
                                {property.title}
                              </Link>
                            </div>

                            <div className="text-date">
                              {property.location}
                            </div>

                            <div className="text-btn text-color-primary">
                               ₹{property.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="text-date">
                          {property.listingDate}
                        </div>
                      </td>

                      <td>
                        <span>{property.bookingDate}</span>
                      </td>

                      <td>
                        <span>{property.status1}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="wg-pagination">
              <li className="arrow">
                <a href="#">
                  <i className="icon-arrow-left" />
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">...</a>
              </li>
              <li className="active">
                <a href="#">20</a>
              </li>
              <li className="arrow">
                <a href="#">
                  <i className="icon-arrow-right" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* .footer-dashboard */}
        <div className="footer-dashboard">
          <p>Copyright © {new Date().getFullYear()} My Hoardings</p>
          <ul className="list">
            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms and Conditions</a>
            </li>
          </ul>
        </div>
        {/* /.footer-dashboard */}
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
