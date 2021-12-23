import React from "react";
import contactLogo from "../../assets/images/general/contact.svg";
import { ReactComponent as ArrowSimple } from "../../assets/images/general/arrow-simple.svg";

export default function StoreCard({
  data,
  setModalSchedule,
  setStoreSelected,
}) {
  return (
    <div className="bg-beige flex flex-col items-center justify-center p-3 lg:p-5 lg:w-56 border-2 border-transparent hover:border-yellow transition-all duration-300 ease-in-out my-3">
      <div className="">
        <img src={contactLogo} alt="" className="h-10" />
      </div>
      <p className=" text-sm lg:text-base text-center mt-4 font-bold text-blueText">{data.name}</p>
      <p className=" text-center mt-4 text-xs lg:text-base">
        {data.address}
      </p>
      <p className=" text-center mt-3 text-xs lg:text-base">
        {data.phone} <br /> {data.email}
      </p>
      <button
        onClick={() => {
          setStoreSelected(data);
          setModalSchedule(true);
        }}
        className="h-10 border-black border-2 bg-transparent hover:bg-black text-black hover:text-white uppercase mt-4 px-3 w-28 lg:w-40 flex items-center transition-all duration-300 focus:outline-none group font-bold font-neutra text-xs lg:text-base"
      >
        HORARIOS{" "}
        <span className="ml-2 lg:ml-4">
          <ArrowSimple className="h-3 transform group-hover:translate-x-4 transition-all duration-100 fill-current" />
        </span>
      </button>
    </div>
  );
}
