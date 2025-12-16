"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownSelect from "../common/DropdownSelect";
// import { properties, properties5 } from "@/data/properties";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
export default function Property() {
  const [posters, SetPosters] = useState([]);

  function decodeJWT(token) {
    if (!token) return null;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const fetchPosters = async () => {
    try {
   

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posters/company/v1`,
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.data);
      if (res.status === 200) {
        SetPosters(res.data.data);
      }
    } catch (error) {
      console.error("error occured while fetching posters", error.message);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  return (
    <div className="main-content w-100">
      <div className="main-content-inner wrap-dashboard-content">
        {/* <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div> */}

        <div className="row mt-5">
          {/* <div className="col-lg-3 col-md-3 col-12">
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
          </div> */}

          <div className="col-lg-5 col-md-6 col-12">
            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset className="box-fieldset">
                <label> Search </label>
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
          <h3 className="title">Bookings</h3>
          <div className="wrap-table">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Booking Details</th>
                    <th>Listing Date</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {posters.map((property, i) => (
                    <tr key={i} className="file-delete">
                      <td>
                        <div className="listing-box">
                          <div className="images">
                            <Image
                              alt="images"
                              src={property.image[0]}
                              width={615}
                              height={405}
                            />
                          </div>

                          <div className="content">
                            <div className="title">
                              <div
                               
                                className="name"
                              >
                                {property.title}
                              </div>
                            </div>

                            <div className="text-date">{property.address}</div>

                            <div className="text-btn text-color-primary">
                              ₹{property.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="text-date">
                          {new Date(property.createdAt).toLocaleDateString(
                            "en-IN"
                          )}
                        </div>
                      </td>

                      <td>
                        <span>
                          {new Date(property.bookingDate).toLocaleDateString()}
                        </span>
                      </td>

                      <td>
                        <span>{property.status}</span>
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
