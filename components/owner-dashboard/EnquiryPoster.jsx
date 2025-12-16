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

export default function Property({ posterId }) {
  const [posters, SetPosters] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState("");

  const openViewModal = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const fetchEnquires = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/enquiries/poster/${posterId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.data.length > 0) {
        SetPosters(res.data.data);
      }
    } catch (error) {
      console.error("error occured while fetching posters", error.message);
    }
  };
  useEffect(() => {
    fetchEnquires();
  }, []);

  const updateStatus = async () => {
    if (!selectedUser) return;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/enquiries/${selectedUser._id}/status`,
        { status },
        {
         withCredentials: true,
        }
      );
      if (res.status === 200) {
        // alert(`User ${status} successfully!`);
        toast.success(`Enquiry ${status} Successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowModal(false);
        fetchEnquires(); // refresh list
      }
    } catch (error) {
      console.error("Status update failed:", error.response?.data || error);
      // alert("Failed to update status");
      toast.error("Failed to update status", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="main-content w-100">
        <div className="main-content-inner wrap-dashboard-content">
          <div className="row mt-5">
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
            <h3 className="title">Enquires</h3>
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Enquires Details</th>
                      <th>Enquiry Date</th>
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
                          No enquiries available.
                        </td>
                      </tr>
                    )}
                    {posters.map((property, i) => (
                      <tr key={i} className="file-delete">
                        <td>
                          <div className="listing-box">
                            <div className="content">
                              <div className="title">
                                <div className="name">{property?.name}</div>
                              </div>

                              <div className="text-date">{property?.email}</div>

                              <div className="text-btn text-color-primary">
                                {property?.mobile}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="text-date">
                            {new Date(property.createdAt).toLocaleDateString()}{" "}
                            {new Date(property.createdAt).toLocaleTimeString()}
                          </div>
                        </td>

                        <td>
                          <div className="status-wrap">
                            <span
                              className={`btn-status  p-2 
        ${property.status === "Pending" ? "bg-warning" : ""} 
        ${property.status === "Accepted" ? "bg-success" : ""} 
        ${property.status === "Rejected" ? "bg-danger" : ""}`}
                            >
                              {property.status}
                            </span>
                          </div>
                        </td>

                        <td>
                          <ul className="list-action">
                            <li>
                              <a
                                className="item"
                                onClick={() => openViewModal(property)}
                                style={{ cursor: "pointer" }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  stroke="#A3ABB0"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                                View
                              </a>
                            </li>
                            <li>
                              <a
                                // href={`/owner-dashboard/edit-property/${property._id}`}
                                className="item"
                                onClick={() => openStatusModal(property)}
                                style={{ cursor: "pointer" }}
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
                                Status
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

          {/* STATUS MODAL */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h4>Update Status for {selectedUser?.fullName}</h4>

                <label className="mt-2 mb-2">Status</label>
                <select
                  className="form-control p-3 text-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" selected>
                    Select Status
                  </option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <div className="modal-actions mt-3">
                  <button
                    className="tf-btn bg-color-primary"
                    onClick={updateStatus}
                  >
                    Submit
                  </button>

                  <button
                    className="tf-btn bg-danger"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODAL */}
          {showViewModal && viewUser && (
            <div className="modal-overlay">
              <div className="modal-box" style={{ width: "600px" }}>
                <h3>Enquiry Details</h3>

                <div className="details-grid">
                  <p>
                    <strong>Name:</strong> {viewUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {viewUser.email}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {viewUser.mobile}
                  </p>
                  <p>
                    <strong>Message:</strong> {viewUser.message}
                  </p>
                  <p>
                    <strong>Campagain From:</strong>{" "}
                    {new Date(viewUser.campagainFrom).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Campagain To:</strong>{" "}
                    {new Date(viewUser.campagainTo).toLocaleDateString()}
                  </p>
                </div>

                <div className="modal-actions mt-3">
                  <button
                    className="tf-btn bg-danger"
                    onClick={() => setShowViewModal(false)}
                  >
                    Close
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
