import React from "react";

export default function Loader() {
  return (
    <div className="lds-ring h-8 w-8">
      <div className="h-6 w-6"></div>
      <div className="h-6 w-6"></div>
      <div className="h-6 w-6"></div>
      <div className="h-6 w-6"></div>
    </div>
  );
}
