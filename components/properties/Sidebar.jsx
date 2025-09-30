
"use client";
import Slider from "rc-slider";
import React, { useState } from "react";
import DropdownSelect from "../common/DropdownSelect";

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState([1000, 70000]);

  return (
    <div className="tf-sidebar">
      <form
        className="form-advanced-search mb-30"
        onSubmit={(e) => e.preventDefault()}
      >
        <h4 className="heading-title mb-30">Advanced Search</h4>
        <fieldset className="mb-12">
          <input
            type="text"
            className="form-control"
            required
            placeholder="Type keyword..."
            name="search"
            id="search"
          />
          <div className="icon">
            <i className="icon-location1" />
          </div>
        </fieldset>

        <fieldset className="mb-30">
          <input
            type="text"
            className="form-control"
            required
            placeholder="Location"
            name="Location"
            id="Location"
          />
          <div className="icon">
            <i className="icon-search" />
          </div>
        </fieldset>

        <div className="widget-range mb-30">
          <div className="box-title-price mb-10">
            <div className="caption-price text-12">
              <span>
                Price: ₹{priceRange[0].toLocaleString()} - ₹
                {priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>

          <Slider
            range
            max={1000}
            min={0}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>

        <div className="group-select mb-30">
          <div className="box-select mb-12">
            <DropdownSelect
              options={[
                "States",
                "Karnataka",
                "Uttar Pradesh",
                "Kerala",
                "New Delhi",
                "Goa",
                "Tamil Nadu"
              ]}
              addtionalParentClass=""
            />
          </div>

          <div className="box-select mb-12">
            <DropdownSelect options={["Categories", "Pole", "Wall", "Digital", "Transit"]} />
          </div>
        </div>

        <button type="submit" className="tf-btn bg-color-primary w-full">
          Search Hoardings
          <i className="icon-search" />
        </button>
      </form>
    </div>
  );
}
