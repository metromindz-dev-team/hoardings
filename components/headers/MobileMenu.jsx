"use client";
import { blogMenu, homes, otherPages, propertyLinks } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const isParentActive = (menus) =>
    menus.some((menu) =>
      menu.submenu
        ? menu.submenu.some((item) =>
            item.submenu
              ? item.submenu.some(
                  (item) => item.href.split("/")[1] === pathname.split("/")[1]
                )
              : item.href.split("/")[1] === pathname.split("/")[1]
          )
        : menu.href.split("/")[1] === pathname.split("/")[1]
    );

  return (
    <div
      className="offcanvas offcanvas-start mobile-nav-wrap"
      tabIndex={-1}
      id="menu-mobile"
      aria-labelledby="menu-mobile"
    >
      <div className="offcanvas-header top-nav-mobile">
        <div className="offcanvas-title">
          <Link href={`/`}>
            <Image alt="" src="/images/logo/logo.png" width={272} height={84} />
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas" aria-label="Close">
          <i className="icon-close" />
        </div>
      </div>
      <div className="offcanvas-body inner-mobile-nav">
        <div className="mb-body">
          <ul id="menu-mobile-menu">
            {/* <li
              className={`menu-item menu-item-has-children-mobile  ${
                homes.some((elm) => elm.href == pathname)
                  ? "current-menu-item"
                  : ""
              } `}
            >
              <a
                href="#dropdown-menu-one"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-one"
              >
                Home
              </a>
              <div
                id="dropdown-menu-one"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {homes.map((link, i) => (
                    <li
                      key={i}
                      className={
                        pathname == link.href
                          ? "menu-item current-item"
                          : "menu-item "
                      }
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li> */}
             <li
              className={`menu-item ${
                "/" == pathname ? "current-item" : ""
              }`}
            >
              <Link href={`/`} className="tem-menu-mobile">
                {" "}
                Home
              </Link>
            </li>
             <li
              className={`menu-item ${
                "/properties-grid" == pathname ? "current-item" : ""
              }`}
            >
              <Link href={`/properties-grid`} className="tem-menu-mobile">
                {" "}
                Hoardings
              </Link>
            </li>
             <li
              className={`menu-item ${
                "/locations-grid" == pathname ? "current-item" : ""
              }`}
            >
              <Link href={`/locations-grid`} className="tem-menu-mobile">
                {" "}
                Locations
              </Link>
            </li>
            
            <li
              className={`menu-item ${
                "/contact" == pathname ? "current-item" : ""
              }`}
            >
              <Link href={`/contact`} className="tem-menu-mobile">
                {" "}
                Contact
              </Link>
            </li>
            <li
              className={`menu-item ${
                "/login" == pathname ? "current-item" : ""
              }`}
            >
              <Link href={`/login`} className="tem-menu-mobile">
                {" "}
                Login
              </Link>
            </li>
          </ul>
          <div className="support">
            <a href="#" className="text-need">
              {" "}
              Need help?
            </a>
            <ul className="mb-info">
              <li>
                Call Us Now: <span className="number">+91 9876543210</span>
              </li>
              <li>
                Support 24/7: <a href="#">example@gmail.com</a>
              </li>
              <li>
                <div className="wrap-social">
                  <p>Follow us:</p>
                  <ul className="tf-social style-2">
                    <li>
                      <a href="#">
                        <i className="icon-fb" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-X" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-linked" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-ins" />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
