import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import Information from "./Information";
import { ReactComponent as Arrow } from "../../assets/images/general/arrow-simple.svg";
import poligon from "../../assets/images/icons/poligon.svg";
import History from "./History";
import Payment from "./Payment";
import Address from "./Address";
import { useAuth } from "../../context/user-auth";

export default function Profile() {
  const wrapperRef = useRef(null);
  const { pathname } = useLocation();
  let auth = useAuth();
  const [openSelect2, setOpenSelect2] = useState(false);
  const [selected, setSelected] = useState("MI CUENTA");

  useEffect(() => {
    if (pathname === "/perfil") {
      setSelected("MI CUENTA");
    } else if (pathname === "/perfil/history") {
      setSelected("HISTORIAL DE COMPRA");
    } else if (pathname === "/perfil/payment") {
      setSelected("MÉTODO DE PAGO");
    } else if (pathname === "/perfil/address") {
      setSelected("MIS DIRECCIONES");
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSelect2(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="px-5 lg:px-0">
      <div className="container mx-auto flex flex-col lg:flex-row mt-5 lg:mt-20">
        <div className="mt-1 relative lg:ml-3 pb-5 lg:hidden">
          <button
            onClick={() => setOpenSelect2(true)}
            className={`relative w-full bg-yellow px-4 py-2 cursor-default focus:outline-none focus:ring-0 flex items-center ${
              openSelect2 ? "border-r-2 border-t-2 border-l-2" : "border-2 "
            }`}
          >
            <span className="block truncate uppercase font-bold pr-3">
              {selected}
            </span>
            <img src={poligon} alt="" className="absolute right-0 mr-4" />
          </button>

          {openSelect2 && (
            <div
              ref={wrapperRef}
              className="absolute w-full bg-yellow z-10 border-2"
            >
              <ul className="max-h-56 overflow-auto focus:outline-none focus:ring-0">
                <Link
                  to="/perfil"
                  onClick={() => {
                    setSelected("MI CUENTA");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  MI CUENTA
                </Link>
                {/* <Link
                  to="/favoritos"
                  onClick={() => {
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  FAVORITOS
                </Link> */}
                <Link
                  to="/perfil/history"
                  onClick={() => {
                    setSelected("HISTORIAL DE COMPRA");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  HISTORIAL DE COMPRA
                </Link>
                <Link
                  to="/perfil/payment"
                  onClick={() => {
                    setSelected("MÉTODO DE PAGO");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  MÉTODO DE PAGO
                </Link>
                <Link
                  to="/perfil/address"
                  onClick={() => {
                    setSelected("MIS DIRECCIONES");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  MIS DIRECCIONES
                </Link>
              </ul>
            </div>
          )}
        </div>

        <div className="w-72 hidden lg:block">
          <div className="w-64 bg-beige border-2 border-blackText">
            <ul>
              <li>
                <Link
                  to="/perfil"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  Mi Cuenta
                  {pathname === "/perfil" && (
                    <div className="">
                      <Arrow className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/perfil/history"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  Historial de Compra
                  {pathname === "/perfil/history" && (
                    <div className="">
                      <Arrow className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/perfil/payment"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  Método de Pago
                  {pathname === "/perfil/payment" && (
                    <div className="">
                      <Arrow className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/perfil/address"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  Mis Direcciones
                  {pathname === "/perfil/address" && (
                    <div className="">
                      <Arrow className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <div className="">
                  <button
                    onClick={() => auth.signout()}
                    className="py-3 px-2 text-left w-full focus:outline-none font-bold"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 lg:pl-20 lg:border-l border-grayText2">
          <Switch>
            <Route exact path={`/perfil`} component={Information} />
            <Route exact path={`/perfil/history`} component={History} />
            <Route exact path={`/perfil/payment`} component={Payment} />
            <Route exact path={`/perfil/address`} component={Address} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
