"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "@/components/admin-dashboard/Modal.css";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isOwnersActive = pathname.startsWith("/admin-dashboard/owners");
  const [ownersExpanded, setOwnersExpanded] = React.useState(isOwnersActive);

  React.useEffect(() => {
    setOwnersExpanded(isOwnersActive);
  }, [isOwnersActive]);

  const handleLogout = () => {
    Cookies.remove("adminToken");
    router.push("/");
  };
  return (
    <div className="wrap-sidebar">
      <div className="sidebar-menu-dashboard">
        <div className="menu-box">
          <ul className="box-menu-dashboard">
            <li
              className={`nav-menu-item ${
                pathname == "/admin-dashboard/dashboard" ? "active" : ""
              } `}
            >
              <Link
                className="nav-menu-link"
                href={`/admin-dashboard/dashboard`}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.668 2.5H12.5013C12.0411 2.5 11.668 2.8731 11.668 3.33333V5.83333C11.668 6.29357 12.0411 6.66667 12.5013 6.66667H16.668C17.1282 6.66667 17.5013 6.29357 17.5013 5.83333V3.33333C17.5013 2.8731 17.1282 2.5 16.668 2.5Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.668 10H12.5013C12.0411 10 11.668 10.3731 11.668 10.8333V16.6667C11.668 17.1269 12.0411 17.5 12.5013 17.5H16.668C17.1282 17.5 17.5013 17.1269 17.5013 16.6667V10.8333C17.5013 10.3731 17.1282 10 16.668 10Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 13.3334H3.33333C2.8731 13.3334 2.5 13.7065 2.5 14.1667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V14.1667C8.33333 13.7065 7.96024 13.3334 7.5 13.3334Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Dashboard
              </Link>
            </li>

            <li
              className={`nav-menu-item ${
                pathname == "/admin-dashboard/my-profile" ? "active" : ""
              } `}
            >
              <Link
                className="nav-menu-link"
                href={`/admin-dashboard/my-profile`}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.082 18.3333H14.9987C15.4407 18.3333 15.8646 18.1577 16.1772 17.8451C16.4898 17.5326 16.6654 17.1087 16.6654 16.6666V5.83329L12.4987 1.66663H4.9987C4.55667 1.66663 4.13275 1.84222 3.82019 2.15478C3.50763 2.46734 3.33203 2.89127 3.33203 3.33329V6.66663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.668 1.66663V4.99996C11.668 5.44199 11.8436 5.86591 12.1561 6.17847C12.4687 6.49103 12.8926 6.66663 13.3346 6.66663H16.668"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.49828 10.9167C2.24146 11.0649 2.02884 11.279 1.88235 11.5368C1.73587 11.7946 1.66082 12.0868 1.66494 12.3833V15.0833C1.65529 15.3802 1.72514 15.6742 1.86726 15.935C2.00937 16.1958 2.2186 16.4139 2.47328 16.5667L4.99828 18.0833C5.25385 18.2356 5.5455 18.3166 5.84297 18.3181C6.14044 18.3195 6.43288 18.2414 6.68994 18.0917L9.16494 16.5833C9.42176 16.4351 9.63438 16.221 9.78087 15.9632C9.92735 15.7054 10.0024 15.4132 9.99828 15.1167V12.4167C10.0079 12.1198 9.93808 11.8258 9.79596 11.565C9.65385 11.3042 9.44462 11.0861 9.18994 10.9333L6.66494 9.41666C6.40937 9.26442 6.11771 9.18337 5.82025 9.1819C5.52278 9.18044 5.23033 9.25862 4.97328 9.40832L2.49828 10.9167Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83203 14.1666V18.3333"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.7513 11.8334L5.83464 14.1667L1.91797 11.8334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Profile
              </Link>
            </li>

            {/* <li
              className={`nav-menu-item ${
                pathname.startsWith("/admin-dashboard/owners") ? "active" : ""
              } `}
            >
              <Link
                className="nav-menu-link"
                href={`/admin-dashboard/owners/pending`}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15C16.3807 15 17.5 13.8807 17.5 12.5C17.5 11.1193 16.3807 10 15 10C13.6193 10 12.5 11.1193 12.5 12.5C12.5 13.8807 13.6193 15 15 15Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5013 9.16667C9.34225 9.16667 10.8346 7.67428 10.8346 5.83333C10.8346 3.99238 9.34225 2.5 7.5013 2.5C5.66035 2.5 4.16797 3.99238 4.16797 5.83333C4.16797 7.67428 5.66035 9.16667 7.5013 9.16667Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33464 12.5H5.0013C4.11725 12.5 3.2694 12.8512 2.64428 13.4763C2.01916 14.1014 1.66797 14.9493 1.66797 15.8333V17.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.082 13.6666L17.332 13.4166"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.668 11.5834L11.918 11.3334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.832 15.5834L14.082 14.8334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.918 10.1666L16.168 9.41663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.3333 15.5833L16 14.75"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0013 10.25L13.668 9.41663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.918 13.8333L12.7513 13.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.25 11.5L18.0833 11.1666"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Owners
              </Link>
            </li> */}

            <li className={`nav-menu-item ${isOwnersActive ? "active" : ""}`}>
              <div
                onClick={() => setOwnersExpanded(!ownersExpanded)}
                className="nav-menu-link cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center gap-4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {/* ICON */}
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 15C16.3807 15 17.5 13.8807 17.5 12.5C17.5 11.1193 16.3807 10 15 10C13.6193 10 12.5 11.1193 12.5 12.5C12.5 13.8807 13.6193 15 15 15Z"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5013 9.16667C9.34225 9.16667 10.8346 7.67428 10.8346 5.83333C10.8346 3.99238 9.34225 2.5 7.5013 2.5C5.66035 2.5 4.16797 3.99238 4.16797 5.83333C4.16797 7.67428 5.66035 9.16667 7.5013 9.16667Z"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.33464 12.5H5.0013C4.11725 12.5 3.2694 12.8512 2.64428 13.4763C2.01916 14.1014 1.66797 14.9493 1.66797 15.8333V17.5"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.082 13.6666L17.332 13.4166"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.668 11.5834L11.918 11.3334"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.832 15.5834L14.082 14.8334"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.918 10.1666L16.168 9.41663"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.3333 15.5833L16 14.75"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.0013 10.25L13.668 9.41663"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.918 13.8333L12.7513 13.5"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.25 11.5L18.0833 11.1666"
                      stroke="#A8ABAE"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ marginLeft: "8px" }}>Owners</span>
                  <svg
                    style={{
                      marginLeft: "auto",
                      transform: ownersExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#A8ABAE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* SUBMENU */}
              {ownersExpanded && (
                <ul style={{ 
                  marginLeft: "40px", 
                  marginTop: "8px",
                  listStyle: "none",
                  padding: 0
                }}>
                  <li style={{ marginBottom: "4px" }}>
                    <Link
                      href="/admin-dashboard/owners/pending"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 16px",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: pathname === "/admin-dashboard/owners/pending" ? "#1E40AF" : "#6B7280",
                        backgroundColor: pathname === "/admin-dashboard/owners/pending" ? "#EFF6FF" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        fontWeight: pathname === "/admin-dashboard/owners/pending" ? "600" : "400",
                      }}
                      onMouseEnter={(e) => {
                        if (pathname !== "/admin-dashboard/owners/pending") {
                          e.target.style.backgroundColor = "#F3F4F6";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (pathname !== "/admin-dashboard/owners/pending") {
                          e.target.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: pathname === "/admin-dashboard/owners/pending" ? "#1E40AF" : "#D1D5DB",
                        marginRight: "12px",
                      }}></span>
                      Pending Requests
                    </Link>
                  </li>

                  <li style={{ marginBottom: "4px" }}>
                    <Link
                      href="/admin-dashboard/owners/approved"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 16px",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: pathname === "/admin-dashboard/owners/approved" ? "#1E40AF" : "#6B7280",
                        backgroundColor: pathname === "/admin-dashboard/owners/approved" ? "#EFF6FF" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        fontWeight: pathname === "/admin-dashboard/owners/approved" ? "600" : "400",
                      }}
                      onMouseEnter={(e) => {
                        if (pathname !== "/admin-dashboard/owners/approved") {
                          e.target.style.backgroundColor = "#F3F4F6";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (pathname !== "/admin-dashboard/owners/approved") {
                          e.target.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: pathname === "/admin-dashboard/owners/approved" ? "#1E40AF" : "#D1D5DB",
                        marginRight: "12px",
                      }}></span>
                      Approved Requests
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li
              className={`nav-menu-item ${
                pathname == "/admin-dashboard/companies" ? "active" : ""
              } `}
            >
              <Link
                className="nav-menu-link"
                href={`/admin-dashboard/companies`}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15C16.3807 15 17.5 13.8807 17.5 12.5C17.5 11.1193 16.3807 10 15 10C13.6193 10 12.5 11.1193 12.5 12.5C12.5 13.8807 13.6193 15 15 15Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5013 9.16667C9.34225 9.16667 10.8346 7.67428 10.8346 5.83333C10.8346 3.99238 9.34225 2.5 7.5013 2.5C5.66035 2.5 4.16797 3.99238 4.16797 5.83333C4.16797 7.67428 5.66035 9.16667 7.5013 9.16667Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33464 12.5H5.0013C4.11725 12.5 3.2694 12.8512 2.64428 13.4763C2.01916 14.1014 1.66797 14.9493 1.66797 15.8333V17.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.082 13.6666L17.332 13.4166"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.668 11.5834L11.918 11.3334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.832 15.5834L14.082 14.8334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.918 10.1666L16.168 9.41663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.3333 15.5833L16 14.75"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0013 10.25L13.668 9.41663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.918 13.8333L12.7513 13.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.25 11.5L18.0833 11.1666"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Companies
              </Link>
            </li>

            <li className={`nav-menu-item `}>
              <button
                className="nav-menu-link w-full text-left"
                onClick={handleLogout}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.332 14.1667L17.4987 10L13.332 5.83337"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 10H7.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
