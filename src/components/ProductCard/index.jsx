import React, { useContext, useEffect, useState } from "react";
import heart from "../../assets/images/icons/heart.svg";
import blank from "../../assets/images/blank.png";
import { Link } from "react-router-dom";
import { updateCart } from "../../services/updateCart";
import { CartContext } from "../../context/CartContext";

export default function ProductCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const [, setCart] = useContext(CartContext);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    //Update Cart
    const handleQtyChange = () => {
      let existingCart = localStorage.getItem("mm-cart");
      existingCart = JSON.parse(existingCart);

      const updatedCart = updateCart(
        existingCart,
        data.variants[0],
        false,
        qty
      );

      setCart(updatedCart);
    };

    if (qty > 0) {
      handleQtyChange();
    }
    // eslint-disable-next-line
  }, [qty]);

  useEffect(() => {
    let existingCart = localStorage.getItem("mm-cart");
    if (existingCart) {
      let existingCartParsed = JSON.parse(existingCart);
      existingCartParsed.products.forEach((product) => {
        if (product.id === data.variants[0]?.id) {
          setQty(product.qty);
          return;
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHidden(false)}
      onMouseLeave={() => setIsHidden(true)}
      className="w-40 lg:w-44 relative py-3"
    >
      <div
        onClick={() => setIsFavorite(!isFavorite)}
        className={`w-8 h-8 absolute right-0 bottom-20 lg:bottom-auto mt-3 rounded-full shadow-lg flex justify-center items-center cursor-pointer z-10 ${
          isFavorite ? " bg-yellow" : " bg-white"
        }`}
      >
        <img src={heart} alt="" className=" h-4 w-4" />
      </div>

      <Link to={`/productos/detalles/${data.id}`} className="group">
        <img
          src={data.variants[0]?.image_url || blank}
          alt=""
          className="h-40 object-cover mx-auto transition-all duration-300 ease-linear group-hover:scale-110 transform"
        />
        <div className="relative w-full">
          <AddtoCartControls isHidden={isHidden} data={data} />
        </div>
        <p className="text-center text-blueText truncate text-sm pt-2 mt-2 font-circular border-t-2 border-grayText2 ">
          <span>{data.variants[0]?.name}</span>
        </p>
        <div className="flex space-x-3 justify-center">
          {data?.variants[0]?.offer_price !== 0 && (
            <p className=" text-orange line-through font-bold">
              ${data?.variants[0]?.retail_price?.toFixed(2)}
            </p>
          )}
          <p className="text-center text-blueText font-circular font-bold">
            ${data.variants[0]?.final_price?.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export function AddtoCartControls({ isHidden, data }) {
  return (
    <div
      className={`absolute h-full w-full flex justify-center bottom-32 lg:bottom-16 ${
        isHidden ? "visible lg:invisible" : "visible"
      }`}
    >
      <div className="w-full lg:w-44 mt-10 lg:mt-0">
        {data.variants[0]?.available_balance < 1 && (
          <span className=" bg-grayText2 text-xs cursor-pointer font-bold font-neutra h-8 w-full lg:w-44 flex items-center justify-center space-x-1 px-2">
            AGOTADO
          </span>
        )}
      </div>
    </div>
  );
}
