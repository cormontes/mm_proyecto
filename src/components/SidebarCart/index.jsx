import React, { useContext } from "react";
import close from "../../assets/images/icons/close.svg";
import blank from "../../assets/images/blank.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/user-auth";
import { CartContext } from "../../context/CartContext";
import { removeItemFromCart } from "../../services/updateCart";

export default function SidebarCart({
  isOpen,
  setIsOpen,
  setOpenSearch,
  setOpenLogin,
  setOpen1,
  setOpen2,
  setOpen3,
}) {
  const [cart, setCart] = useContext(CartContext);
  let auth = useAuth();

  const handleRemoveProduct = (id) => {
    const updatedCart = removeItemFromCart(id);

    setCart(updatedCart);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
        ></div>
      )}

      <aside
        className={`transform top-0 right-0 max-w-md w-full bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 flex flex-col ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-24 bg-transparent flex w-full justify-end items-center px-5">
          <div className="">
            <img
              onClick={() => {
                setIsOpen(false)
              }}
              src={close}
              alt=""
              className="h-6 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart?.products?.map((val, index) => (
            <div key={index} className="flex py-3 border-b border-grayText2">
              <div className="h-20 w-20">
                <img
                  src={val.image_url || blank}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 ml-5">
                <p className=" text-black lg:text-lg font-circular font-bold">
                  {val.name}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end text-grayInput">
                <img
                  src={close}
                  onClick={() => handleRemoveProduct(val.id)}
                  alt=""
                  className=" fill-current h-4 cursor-pointer"
                />

                <p className=" font-bold font-circular">
                  ${val.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="py-5 px-5 font-circular">
          <div className="flex justify-between text-black text-lg uppercase font-bold">
            Subtotal
            <span className="text-black text-xl font-bold">
              ${cart?.totalProductsPrice?.toFixed(2)}
            </span>
          </div>
          {auth.user ? (
            <Link
              to="/cart/checkout"
              onClick={() => setIsOpen(false)}
              className="block bg-yellow w-full py-3 text-blackText text-center mt-4 font-neutra font-bold"
            >
              IR A CHECKOUT
            </Link>
          ) : (
            <button
              onClick={() => {
                setOpenLogin(true);
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setIsOpen(false);
              }}
              className="block bg-yellow w-full py-3 text-blackText text-center mt-4 font-neutra font-bold"
            >
              INICIAR SESIÓN
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
