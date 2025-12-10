"use client";

import React from "react";
import LineChart from "./Chart";
import Link from "next/link";
import Image from "next/image";
import { properties } from "@/data/properties";


export default function CompanyDashboard() {

  return (
    <div className="main-content w-100 dashboardPage">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="flat-counter-v2 tf-counter">
          <div className="counter-box">
            <div className="box-icon">
              <span className="icon">
                <svg
                  width={36}
                  height={36}
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.5 3H9C8.20435 3 7.44129 3.31607 6.87868 3.87868C6.31607 4.44129 6 5.20435 6 6V30C6 30.7956 6.31607 31.5587 6.87868 32.1213C7.44129 32.6839 8.20435 33 9 33H27C27.7956 33 28.5587 32.6839 29.1213 32.1213C29.6839 31.5587 30 30.7956 30 30V10.5L22.5 3Z"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 3V9C21 9.79565 21.3161 10.5587 21.8787 11.1213C22.4413 11.6839 23.2044 12 24 12H30"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 19.5H15"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 19.5H24"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 25.5H15"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 25.5H24"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="content-box">
              <div className="title-count text-variant-1">Booked Listings</div>
              <div className="box-count d-flex align-items-end">
                <div className="number">30</div>
              </div>
            </div>
          </div>

          <div className="counter-box">
            <div className="box-icon">
              <span className="icon">
                <svg
                  width={36}
                  height={36}
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5061 32.991C15.4409 33.0945 12.4177 32.2559 9.84374 30.5882C7.26982 28.9206 5.26894 26.504 4.11073 23.6642C2.95253 20.8243 2.69265 17.6977 3.36614 14.7056C4.03962 11.7135 5.61409 8.9998 7.87737 6.9301C10.1407 4.86039 12.984 3.5342 16.0242 3.13022C19.0644 2.72624 22.1554 3.2639 24.8807 4.67074C27.6059 6.07757 29.8344 8.28598 31.2659 10.9984C32.6974 13.7107 33.263 16.7967 32.8866 19.8405"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 9V18L21 19.5"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 27L27 33L33 27"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27 21V33"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="content-box">
              <div className="title-count text-variant-1">Active Listings</div>
              <div className="box-count d-flex align-items-end">
                <div className="number">12</div>
              </div>
            </div>
          </div>

          <div className="counter-box">
            <div className="box-icon">
              <span className="icon">
                <svg
                  width={36}
                  height={36}
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.5 22.5C31.5 23.2956 31.1839 24.0587 30.6213 24.6213C30.0587 25.1839 29.2956 25.5 28.5 25.5H10.5L4.5 31.5V7.5C4.5 6.70435 4.81607 5.94129 5.37868 5.37868C5.94129 4.81607 6.70435 4.5 7.5 4.5H28.5C29.2956 4.5 30.0587 4.81607 30.6213 5.37868C31.1839 5.94129 31.5 6.70435 31.5 7.5V22.5Z"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18C12.7956 18 13.5587 17.6839 14.1213 17.1213C14.6839 16.5587 15 15.7956 15 15V12H12"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 18C21.7956 18 22.5587 17.6839 23.1213 17.1213C23.6839 16.5587 24 15.7956 24 15V12H21"
                    stroke="#F1913D"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="content-box">
              <div className="title-count text-variant-1">Expired Listings</div>
              <div className="d-flex align-items-end">
                <div className="number">10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Listing Overview */}
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-12">
            <div className="widget-box-2 wd-listing mb-24">
              <h3 className="title">Booked Listings</h3>
              <div className="wrap-table">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Listing Details</th>
                        <th>Listed Date</th>
                        <th>Booking Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {properties.filter((listing) => listing.id <= 3).map((listing) => (
                        <tr key={listing.id} className="file-delete">
                          <td>
                            <div className="listing-box">
                              <div className="images">
                                <Image
                                  alt="images"
                                  width={615}
                                  height={405}
                                  src={listing.imageSrc}
                                />
                              </div>

                              <div className="content">
                                <div className="title">
                                  <Link
                                    href={`/property-detail-v2/${listing.id}`}
                                    className="link"
                                  >
                                    {listing.title}
                                  </Link>
                                </div>

                                <div className="text-date">
                                  {listing.location}
                                </div>

                                <div className="text-date">
                                  {listing.size}
                                </div>

                                <div className="text-btn text-color-primary">
                                  ₹{listing.price.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span>{listing.listingDate}</span>
                          </td>

                          <td>
                            <span>{listing.bookingDate}</span>
                          </td>

                          <td>
                            <span>{listing.status1}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <a href="#" className="tf-btn bg-color-primary pd-10 fw-7 mt-3">
                  View All Bookings
                </a>
              </div>
            </div>

            <div className="widget-box-2 wd-chart">
              <h5 className="title">Booking Analysis</h5>
              <div className="chart-box">
                <LineChart />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-9">
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
        </div>
      </div>

      <div className="overlay-dashboard" />
    </div>
  );
}
