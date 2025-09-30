"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { footerData } from "@/data/footerLinks";

export default function Footer1({ logo = "/images/logo/logo-light.png" }) {
  useEffect(() => {
    const headings = document.querySelectorAll(".title-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };

  return (
    <footer id="footer">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="footer-top">
              <div className="footer-logo">
                <Link href={`/`}>
                  <Image
                    id="logo_footer"
                    alt="logo-footer"
                    src={logo}
                    width={272}
                    height={85}
                  />
                </Link>
              </div>

              <div className="wrap-contact-item">
                <div className="contact-item">
                  <div className="icons">
                    <i className="icon-phone-2" />
                  </div>

                  <div className="content">
                    <div className="title text-1">Call us</div>
                    <h6>
                      <a href="#"> (+91) 9876543210</a>
                    </h6>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icons">
                    <i className="icon-letter-2" />
                  </div>

                  <div className="content">
                    <div className="title text-1">Mail us</div>
                    <h6 className="fw-4">
                      <a href="#">example@gmail.com</a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-main">
            <div className="row">
              {footerData.map((column, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div
                    className={`footer-menu-list footer-col-block ${
                      column.className || ""
                    }`}
                  >
                    <h5 className="title lh-30 title-desktop">
                      {column.title}
                    </h5>

                    <h5 className="title lh-30 title-mobile">{column.title}</h5>
                    
                    <ul className="tf-collapse-content">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          {link.href.startsWith("/") ? (
                            <Link href={link.href}>{link.text}</Link>
                          ) : (
                            <a href={link.href}>{link.text}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="footer-bottom">
            <p>
              Copyright © {new Date().getFullYear()}{" "}
              <span className="fw-7">MyHoardings</span> . Designed &amp;
              Developed by{" "}
              <a href="#"> Metromindz Pvt. Ltd.</a>
            </p>

            <div className="wrap-social">
              <div className="text-3  fw-6 text_white">Follow us</div>
              <ul className="tf-social ">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
