
"use client";
import React from "react";
import DropdownSelect from "../common/DropdownSelect";
import Link from "next/link";
import SearchForm from "../common/SearchForm";

export default function FilterTop() {
  return (
    <section className="flat-title style-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="title-inner">
              <ul className="breadcrumb">
                <li>
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                </li>

                <li>Hoarding Listings</li>
              </ul>
            </div>

            <div className="wg-filter style-2 relative">
              <div className="form-title style-2">
                <form>
                  <fieldset>
                    <input type="text" placeholder="Address, City, ZIP..." />
                  </fieldset>
                </form>

                <div className="wrap-btn searchFormToggler">
                  <a href="#" className="tf-btn bg-color-primary pd-3 fw-6">
                    Search <i className="icon-MagnifyingGlass fw-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
