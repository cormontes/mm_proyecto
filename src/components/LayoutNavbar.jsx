import React from "react";
import Navbar from "./Navbar";

export default function LayoutNavbar({ children }) {
  return (
    <div>
      <Navbar />
      <div className="h-24"></div>
      {children}
    </div>
  );
}
