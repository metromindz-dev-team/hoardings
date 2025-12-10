"use client";

import React from "react";
import LineChart from "./Chart";
import Link from "next/link";
import Image from "next/image";
import { properties } from "@/data/properties";

export default function Dashboard() {
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
              <div className="title-count text-variant-1">Listed</div>
              <div className="box-count d-flex align-items-end">
                <div className="number">30</div>
                <span className="text">/50 remaining</span>
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
                <div className="number">20</div>
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
                    d="M6 33H27C27.7956 33 28.5587 32.6839 29.1213 32.1213C29.6839 31.5587 30 30.7956 30 30V10.5L22.5 3H9C8.20435 3 7.44129 3.31607 6.87868 3.87868C6.31607 4.44129 6 5.20435 6 6V9"
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
                    d="M15.4348 16.05C14.9224 15.5384 14.2692 15.191 13.5586 15.0521C12.848 14.9132 12.1121 14.989 11.4448 15.27C11.0098 15.45 10.6048 15.72 10.2748 16.065L9.74976 16.575L9.22476 16.065C8.71531 15.5539 8.0656 15.2055 7.35797 15.064C6.65033 14.9225 5.9166 14.9942 5.24976 15.27C4.79976 15.45 4.40976 15.72 4.06476 16.065C2.63976 17.475 2.56476 19.86 4.36476 21.675L9.74976 27L15.1498 21.675C16.9498 19.86 16.8598 17.475 15.4348 16.065V16.05Z"
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
              <div className="d-flex align-items-end">
                <div className="number">06</div>
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
            {/* <div className="widget-box-2 wd-listing mb-24">
              <h3 className="title">My Listings</h3>
              <div className="wrap-table">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Listing Details</th>
                        <th>Listed Date</th>
                        <th>Status</th>
                        <th>Action</th>
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
                            <span>{listing.status}</span>
                          </td>

                          <td>
                            <ul className="list-action">
                              <li>
                                <a className="item">
                                  <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016"
                                      stroke="#A3ABB0"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Edit
                                </a>
                              </li>

                              <li>
                                <a className="remove-file item">
                                  <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568"
                                      stroke="#A3ABB0"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <a href="#" className="tf-btn bg-color-primary pd-10 fw-7 mt-3">
                  View All Listings
                </a>
              </div>
            </div> */}

            <div className="widget-box-2 wd-chart">
              <h5 className="title">Listing Analysis</h5>
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
