"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropdownSelect from "../common/DropdownSelect";
// import { properties, properties5 } from "@/data/properties";
import axios from "axios";
import "@/components/admin-dashboard/Modal.css";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

export default function Property() {
  const [posters, SetPosters] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);

  const fetchPosters = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posters`);
      if (res.data.length > 0) {
        SetPosters(res.data);
      }
    } catch (error) {
      console.error("error occured while fetching posters", error.message);
    }
  };
  useEffect(() => {
    fetchPosters();
  }, []);

  const confirmDelete = async () => {
    if (!deleteUser) return;

    try {
      const ownerToken = Cookies.get("ownerToken");

      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posters/${deleteUser._id}`,
        {
          headers: { Authorization: `Bearer ${ownerToken}` },
        }
      );

      if (res.status === 200) {
        toast.success("Poster deleted successfully");

        // Instantly update UI
        SetPosters((prev) =>
          prev.filter((item) => item._id !== deleteUser._id)
        );

        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete Poster");
    }
  };

  return (
    <>
      <div className="main-content w-100">
        <div className="main-content-inner wrap-dashboard-content">
          <div className="button-show-hide show-mb">
            <span className="body-1">Show Dashboard</span>
          </div>

          <div className="row mt-5">
            <div className="col-lg-3 col-md-3 col-12">
              <form onSubmit={(e) => e.preventDefault()}>
                <fieldset className="box-fieldset">
                  <label>Status </label>

                  <DropdownSelect
                    options={["Select", "Booked", "Not Booked", ]}
                    addtionalParentClass=""
                  />
                </fieldset>
              </form>
            </div>

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

            <div className="col-lg-2 col-md-2 col-12">
              <div className="box mt-5">
                <a
                  href="/owner-dashboard/add-property"
                  className="tf-btn bg-color-primary pd-10"
                >
                  Add Property
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
                      <th>Listed Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {posters.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          No listings available.
                        </td>
                      </tr>
                    )}
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
                                <Link
                                  // href={`/property-detail-v2/${property._id}`}
                                  href={`/owner-dashboard/enquiry-poster/${property._id}`}
                                  className="link"
                                >
                                  {property.title}
                                </Link>
                              </div>

                              <div className="text-date">
                                {property.address}
                              </div>

                              <div className="text-btn text-color-primary">
                                ₹{property.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          {/* <div className="text-date">{property.createdAt}</div> */}
                          <div className="text-date">
                            {new Date(property.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td>
                          <div className="status-wrap">
                            <a className="btn-status"> {property.status}</a>
                          </div>
                        </td>

                        <td>
                          <ul className="list-action">
                            <li>
                              <a
                                href={`/owner-dashboard/edit-property/${property._id}`}
                                className="item"
                              >
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
                              <a
                                className="remove-file item"
                                onClick={() => {
                                  setDeleteUser(property);
                                  setShowDeleteModal(true);
                                }}
                              >
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

          {/* DELETE CONFIRM MODAL */}
          {showDeleteModal && deleteUser && (
            <div className="modal-overlay">
              <div className="modal-box" style={{ width: "400px" }}>
                <h3>Delete Poster</h3>
                <p style={{ marginTop: "10px" }}>
                  Are you sure you want to permanently delete{" "}
                  <strong>{deleteUser.title}</strong>?
                </p>

                <div className="modal-actions mt-3">
                  <button className="tf-btn bg-danger" onClick={confirmDelete}>
                    Yes, Delete
                  </button>

                  <button
                    className="tf-btn bg-color-primary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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
      <ToastContainer />
    </>
  );
}
