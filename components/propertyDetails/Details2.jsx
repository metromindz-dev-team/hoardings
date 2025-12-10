import React from "react";
import Slider2 from "./sliders/Slider2";
import PropertyOverview from "./PropertyOverview";
import ExtraInfo from "./ExtraInfo";
import Features from "./Features";
import Location from "./Location";
import Sidebar from "./Sidebar";

export default function Details2({ property }) {
  
  return (
    <section className="section-property-detail style-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <Slider2 property={property}/>
            
            <div className="wg-property box-overview style-2">
              <PropertyOverview property={property} />
            </div>

            <div className="wg-property box-property-detail spacing-1">
              <ExtraInfo property={property} />
            </div>

            <div className="wg-property box-amenities spacing-3">
              <Features property={property} />
            </div>

            <div className="wg-property single-property-map spacing-9">
              <Location property={property} />
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <Sidebar property={property} />
          </div>
        </div>
      </div>
    </section>
  );
}
