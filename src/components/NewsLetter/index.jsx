import React from "react";
import { ReactComponent as ArrowSimple } from "../../assets/images/general/arrow-simple.svg";
// import Loader from "../Loader";

export default function NewsLetter() {
  return (
    <div className=" bg-blackText relative px-5 lg:px-0">
      <div className="py-10 lg:py-20 flex flex-col lg:flex-row lg:items-center container mx-auto relative">
        <div className="lg:w-1/2 lg:pr-10">
          <p className=" text-white font-bold text-lg text-center lg:text-left lg:text-2xl uppercase font-neutra">
            Recibe nuestras últimas noticias y promociones cada mes
          </p>
          <p className=" text-grayText2 mt-5 font-circular text-center lg:text-left">
            Ofertas especiales más un 10% de descuento en su primer pedido.
          </p>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0 lg:pl-10">
          <div className="flex flex-col lg:flex-row max-w-lg mx-auto">
            <input
              type="text"
              className="lg:flex-1 h-10 px-0 bg-transparent text-white border-0 border-b-2 border-white focus:ring-0 focus:border-white placeholder-white font-circular"
              placeholder="Correo"
            />
            <button className="h-10 border-white border-2 bg-white lg:bg-transparent hover:bg-white hover:text-black uppercase text-blackText lg:text-white mt-5 lg:mt-0 lg:ml-5 px-6 lg:w-36 flex items-center justify-center transition-all duration-300 focus:outline-none group font-bold font-neutra w-full ">
              ENVIAR{" "}
              <span className="ml-3">
                <ArrowSimple className="h-3 transform group-hover:translate-x-4 transition-all duration-100 fill-current" />
              </span>

              {/* <div className="flex justify-center items-center w-full">
                <Loader />
              </div> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
