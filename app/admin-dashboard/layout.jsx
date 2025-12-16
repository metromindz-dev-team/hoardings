import React from "react";
import Sidebar from "@/components/admin-dashboard/Sidebar";
import Header1 from "@/components/headers/Header1";

export const metadata = {
  title: "",
  description: "",
};

export default function page({ children }) {
  return (
    <>
      <div className="bg-dashboard">
        <div id="wrapper" className="bg-4">
          <Header1 parentClass="header dashboard" />
          <div className="page-layout">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
