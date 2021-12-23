import React, { useState } from "react";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";
// import prueba from "../../assets/images/product1.jpg";
// import heart from "../../assets/images/icons/heart.svg";
import cartWhite from "../../assets/images/icons/cartWhite.svg";
import plus from "../../assets/images/icons/plus.svg";
import arrowSimple from "../../assets/images/general/arrow-simple.svg";
import minus from "../../assets/images/icons/minus.svg";
// import ProductCard from "../../components/ProductCard";

export default function Favorites() {
  return (
    <div>
      <div className="container mx-auto mt-20 px-5 lg:px-40 relative">
        <h2 className="text-xl text-blackText pb-4 font-bold hidden lg:block">
          Mis Favoritos
        </h2>

        <div className="mt-10 border-t border-b border-grayText2 hidden lg:block">
          <div className="my-2 bg-grayFooter flex items-center py-2 font-bold">
            <div className="w-5/12 pl-3">Producto</div>
            <div className="w-3/12">Precio</div>
            <div className="w-3/12">Agregar</div>
            <div className="w-1/12"></div>
          </div>
        </div>

        <div className="lg:hidden border-b">
          <p className=" uppercase py-4 font-bold">10 PRODUCTOS</p>
        </div>

        {/* <div className="hidden lg:block">
          {[1, 2, 3, 4, 5].map((data, index) => (
            <div
              className="flex items-center py-5 border-b border-grayText2"
              key={index}
            >
              <div className="w-5/12 flex items-center">
                <div className="flex-shrink-0 ml-1">
                  <img src={prueba} alt="" className="w-20" />
                </div>
                <p className=" font-bold ml-1 text-sm pr-5">
                  CARTERA DE CUERO GEORGINA
                </p>
              </div>
              <div className="w-3/12">$24.90</div>
              <div className="w-3/12">
                <AddtoCartControls />
              </div>
              <div className="w-1/12">
                <div
                  className={`w-8 h-8 ml-3 rounded-full shadow-lg flex justify-center items-center cursor-pointer bg-white`}
                >
                  <img src={heart} alt="" className=" h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-5 lg:border-t lg:hidden">
          {[
            { image: 1, name: "CARTERA MIKE MIKE BIASIA" },
            { image: 2, name: "MOCHILA GO STUDENT" },
            { image: 3, name: "CARTERA MIKE MIKE DORIA" },
            { image: 4, name: "CARTERA MIKE MIKE BIASIA" },
            { image: 2, name: "CARTERA DE CUERO GEORGINA" },
            { image: 4, name: "MOCHILA GO STUDENT" },
            { image: 1, name: "CARTERA MIKE MIKE DORIA" },
            { image: 3, name: "CARTERA MIKE MIKE BIASIA" },
            { image: 1, name: "CARTERA DE CUERO GEORGINA" },
          ].map((value, index) => (
            <div className="flex justify-center py-8 lg:py-12" key={index}>
              <ProductCard data={value} />
            </div>
          ))}
        </div> */}

        <div className="flex justify-center mt-10 pb-20 space-x-10 lg:space-x-40">
          <div className="flex items-center cursor-pointer">
            <img
              src={arrowSimple}
              alt=""
              className="mr-3 transform rotate-180 h-3"
            />
            <span className=" font-bold text-xl text-blackText uppercase hidden lg:inline">
              Anterior
            </span>
          </div>

          <div className="space-x-3 text-xl">
            <span className="">1</span>
            <span className="text-grayText2 cursor-pointer">2</span>
            <span className="text-grayText2 cursor-pointer">3</span>
            <span className="text-grayText2 cursor-pointer">4</span>
          </div>

          <div className="flex items-center cursor-pointer">
            <span className=" font-bold text-xl text-blackText uppercase hidden lg:inline">
              Siguiente
            </span>
            <img src={arrowSimple} alt="" className="ml-3 h-3" />
          </div>
        </div>
      </div>

      <NewsLetter />

      <Footer />
    </div>
  );
}

export function AddtoCartControls() {
  const [qty, setQty] = useState(0);

  const addtoCart = () => {
    setQty(1);
  };

  const changeQty = (qty) => {
    setQty(qty);
  };

  return (
    <div className={`flex justify-start`}>
      {qty < 1 ? (
        <button
          onClick={() => addtoCart()}
          className="bg-black h-10 w-44 text-white flex items-center justify-center space-x-1 px-2"
        >
          <img src={cartWhite} alt="" className="h-6" />
          <span className="text-xs text-center font-bold font-neutra">
            AÑADIR A CARRITO
          </span>
          <img src={plus} alt="" className="h-3" />
        </button>
      ) : (
        <div className="bg-black h-10 w-44 text-white flex items-center justify-center space-x-1 px-2">
          <span
            onClick={() => changeQty((qty) => qty - 1)}
            className="h-full flex items-center cursor-pointer"
          >
            <img src={minus} alt="" className="w-5" />
          </span>
          <span className="text-center flex-1">{qty}</span>
          <span onClick={() => changeQty((qty) => qty + 1)}>
            <img src={plus} alt="" className="h-4 cursor-pointer" />
          </span>
        </div>
      )}
    </div>
  );
}
