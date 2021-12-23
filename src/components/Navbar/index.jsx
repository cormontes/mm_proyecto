import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/general/logo-navbar.svg";
import logoBlack from "../../assets/images/general/logo-black.svg";
import close from "../../assets/images/icons/close.svg";
import cartIcon from "../../assets/images/icons/cart.svg";
import user from "../../assets/images/icons/user.svg";
import search from "../../assets/images/icons/search.svg";
import SidebarCart from "../SidebarCart";
import { useAuth } from "../../context/user-auth";
import hambur from "../../assets/images/icons/hambur.png";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
// import Section6 from "./Section6";
import { ReactComponent as Arrow } from "../../assets/images/general/arrow-simple.svg";
import fb from "../../assets/images/icons/facebook.svg";
import ig from "../../assets/images/icons/ig.svg";
import wa from "../../assets/images/icons/wa.svg";
import Login from "./Login";
import Register from "./Register";
import { useCategories } from "../../context/categories";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const wrapperRef = useRef(null);
  const [cartAside, setCartAside] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [dropDownUser, setDropDownUser] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cart] = useContext(CartContext);
  const history = useHistory();
  let auth = useAuth();

  const { categories } = useCategories();

  const route = history.location.pathname;

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropDownUser(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
  }, [route]);

  useEffect(() => {
    if (route === "/login") {
      setOpenLogin(true);
      setOpen1(false);
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
      setOpen5(false);
      setOpen6(false);
      setMobileMenu(false);
    }
  }, [route]);

  return (
    <div className="">
      <div className="fixed top-0 z-50 font-neutra w-full">
        <div className="relative h-24 shadow-md">
          <div
            className={`h-full px-5 lg:px-0
            ${open6 ? "bg-purple" : ""}
            ${open5 ? "bg-lightblue" : ""}
            ${open4 ? "bg-beige" : ""}
            ${open3 ? "bg-brown" : ""}
            ${open2 ? "bg-pink" : ""}
            ${open1 ? "bg-green" : ""} ${
              !open1 && !open2 && !open3 && !open4 && !open5 && !open6
                ? "bg-white"
                : ""
            }`}
          >
            <div className="container mx-auto h-full flex items-center justify-between lg:justify-start">
              <div className="">
                {!open1 &&
                !open2 &&
                !open3 &&
                !open4 &&
                !open5 &&
                !open6 &&
                !openSearch ? (
                  <Link to="/">
                    <img src={logo} alt="" className="h-12" />
                  </Link>
                ) : (
                  <Link to="/">
                    <img src={logoBlack} alt="" className="h-12" />
                  </Link>
                )}
              </div>

              <nav
                onMouseLeave={() => {
                  setOpen1(false);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                  setOpen5(false);
                  setOpen6(false);
                }}
                className={`flex-1 ml-10 lg:flex items-center h-full hidden`}
              >
                <ul
                  className={`font-bold text-blackText text-xs flex space-x-8 ${
                    openSearch || openLogin || openRegister ? "hidden" : ""
                  }`}
                >
                  <li
                    onMouseEnter={() => {
                      setOpen1(true);
                      setOpen2(false);
                      setOpen3(false);
                      setOpen4(false);
                      setOpen5(false);
                      setOpen6(false);
                    }}
                  >
                    <Link
                      to={`/productos/categorias/${
                        categories && categories[0].value
                      }`}
                      className={`uppercase py-3 border-b-2 ${
                        open1
                          ? "text-greenDark border-greenDark"
                          : "border-transparent"
                      }`}
                    >
                      {categories && categories[0].label}
                    </Link>
                  </li>

                  <li
                    onMouseEnter={() => {
                      setOpen1(false);
                      setOpen2(true);
                      setOpen3(false);
                      setOpen4(false);
                      setOpen5(false);
                      setOpen6(false);
                    }}
                  >
                    <Link
                      to={`/productos/categorias/${
                        categories && categories[1].value
                      }`}
                      className={`uppercase py-3 border-b-2 font-bold  ${
                        open2
                          ? "text-pinkDark border-pinkDark"
                          : "border-transparent"
                      }`}
                    >
                      {categories && categories[1].label}
                    </Link>
                  </li>

                  <li
                    onMouseEnter={() => {
                      setOpen1(false);
                      setOpen2(false);
                      setOpen3(true);
                      setOpen4(false);
                      setOpen5(false);
                      setOpen6(false);
                    }}
                  >
                    <Link
                      to={`/productos/categorias/${
                        categories && categories[2].value
                      }`}
                      className={`uppercase py-3 border-b-2  ${
                        open3
                          ? "text-brownDark border-brownDark"
                          : "border-transparent"
                      }`}
                    >
                      {categories && categories[2].label}
                    </Link>
                  </li>
                  <li
                    onMouseEnter={() => {
                      setOpen1(false);
                      setOpen2(false);
                      setOpen3(false);
                      setOpen4(true);
                      setOpen5(false);
                      setOpen6(false);
                    }}
                  >
                    <Link
                      to={`/productos/categorias/${
                        categories && categories[3].value
                      }`}
                      className={`uppercase py-3 border-b-2  ${
                        open4
                          ? "text-beigeDark border-beigeDark"
                          : "border-transparent"
                      }`}
                    >
                      {categories && categories[3].label}
                    </Link>
                  </li>
                  <li
                    onMouseEnter={() => {
                      setOpen1(false);
                      setOpen2(false);
                      setOpen3(false);
                      setOpen4(false);
                      setOpen5(true);
                      setOpen6(false);
                    }}
                  >
                    <Link
                      to={`/productos/categorias/${
                        categories && categories[4].value
                      }`}
                      className={`uppercase py-3 border-b-2  ${
                        open5
                          ? "text-darkblue border-darkblue"
                          : "border-transparent"
                      }`}
                    >
                      {categories && categories[4].label}
                    </Link>
                  </li>
                  {/* <li
                    onMouseEnter={() => {
                      setOpen1(false);
                      setOpen2(false);
                      setOpen3(false);
                      setOpen4(false);
                      setOpen5(false);
                      setOpen6(true);
                    }}
                  >
                    <Link
                      to={`/productos/categorias/${categories && categories[5].value}`}
                      className={`uppercase py-3 border-b-2  ${
                        open6
                          ? "text-purpleDark border-purpleDark"
                          : "border-transparent"
                      }`}
                    >
                      {categories && categories[5].label}
                    </Link>
                  </li> */}
                </ul>

                <Section1
                  open={open1}
                  setOpen={setOpen1}
                  category={categories && categories[0]}
                />
                <Section2
                  open={open2}
                  setOpen={setOpen2}
                  category={categories && categories[1]}
                />
                <Section3
                  open={open3}
                  setOpen={setOpen3}
                  category={categories && categories[2]}
                />
                <Section4
                  open={open4}
                  setOpen={setOpen4}
                  category={categories && categories[3]}
                />
                <Section5
                  open={open5}
                  setOpen={setOpen5}
                  category={categories && categories[4]}
                />
                {/* <Section6 open={open6} setOpen={setOpen6} category={categories && categories[5]}/> */}
              </nav>
              {openSearch || openLogin || openRegister ? (
                <div className="">
                  <img
                    onClick={() => {
                      setOpenSearch(false);
                      setOpenLogin(false);
                      setOpenRegister(false);
                    }}
                    src={close}
                    alt=""
                    className="h-6 cursor-pointer"
                  />
                </div>
              ) : (
                <div className={`flex items-center space-x-5 lg:space-x-10`}>
                  <span
                    onClick={() => {
                      setOpenSearch(true);
                      setOpen1(false);
                      setOpen2(false);
                      setOpen3(false);
                      setOpen4(false);
                      setOpen5(false);
                      setOpen6(false);
                      setMobileMenu(false);
                    }}
                    className="text-grayText2 uppercase font-bold text-sm flex items-center cursor-pointer py-3"
                  >
                    <span className="hidden lg:inline">BUSCAR</span>{" "}
                    <img src={search} alt="" className="h-5 ml-3 mr-1" />
                  </span>
                  <div
                    onClick={() => {
                      if (auth.user) {
                        setDropDownUser(!dropDownUser);
                      } else {
                        setOpenLogin(true);
                        setOpen1(false);
                        setOpen2(false);
                        setOpen3(false);
                        setOpen4(false);
                        setOpen5(false);
                        setOpen6(false);
                        setMobileMenu(false);
                      }
                    }}
                    ref={wrapperRef}
                    className="py-3 cursor-pointer relative"
                  >
                    <img src={user} alt="" className="h-5 " />

                    {dropDownUser && (
                      <div className="absolute mt-12 -ml-10 min-w-max bg-yellow z-10 hidden lg:block">
                        <ul
                          onClick={() => setDropDownUser(false)}
                          className="overflow-auto focus:outline-none focus:ring-0 border-2"
                        >
                          <li>
                            <Link
                              to="/perfil"
                              className="block select-none relative py-2 pl-3 cursor-pointer font-bold border-b"
                            >
                              Mi Cuenta
                            </Link>
                          </li>

                          {/* <li>
                            <Link
                              to="/favoritos"
                              className="block select-none relative py-2 pl-3 cursor-pointer font-bold border-b"
                            >
                              Mis Favoritos
                            </Link>
                          </li> */}

                          <li>
                            <Link
                              to="/perfil/history"
                              className="block select-none relative py-2 pl-3 pr-3 cursor-pointer font-bold border-b"
                            >
                              Historial de Compra
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/perfil/payment"
                              className="block select-none relative py-2 pl-3 cursor-pointer font-bold border-b"
                            >
                              Método de Pago
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/perfil/address"
                              className="block select-none relative py-2 pl-3 cursor-pointer font-bold border-b"
                            >
                              Mis Direcciones
                            </Link>
                          </li>
                          <li>
                            <div
                              onClick={() => auth.signout()}
                              className="block select-none relative py-2 pl-3 cursor-pointer font-bold"
                            >
                              Cerrar Sesión
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => setCartAside(true)}
                    className="py-3 cursor-pointer relative"
                  >
                    <img src={cartIcon} alt="" className="h-8 " />
                    {cart?.products?.length && (
                      <div className=" bg-yellow absolute h-5 w-5 right-0 top-0 -mr-1 mt-2 rounded-full shadow-xl flex justify-center items-center font-bold">
                        {cart?.products?.length}
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setMobileMenu((value) => !value)}
                    className="lg:hidden"
                  >
                    {mobileMenu ? (
                      <img src={close} alt="" className="h-5" />
                    ) : (
                      <img src={hambur} alt="" className="h-5" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <SidebarCart
          isOpen={cartAside}
          setIsOpen={setCartAside}
          setOpenSearch={setOpenSearch}
          setOpenLogin={setOpenLogin}
          setOpen1={setOpen1}
          setOpen2={setOpen2}
          setOpen3={setOpen3}
        />
      </div>

      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setOpenRegister={setOpenRegister}
      />

      <Register
        setOpenLogin={setOpenLogin}
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
      />

      <div
        className={`mt-24 fixed w-full pb-10 bg-yellow ease-in-out transition-all duration-300 transform z-40 overflow-auto lg:hidden ${
          dropDownUser && auth.user ? "translate-y-0" : " -translate-y-full"
        }`}
      >
        <div className="px-5 min-h-full">
          <p className="pb-3 pt-6 font-circular font-medium">Cuenta</p>
          <ul
            onClick={() => setMobileMenu(false)}
            className="font-bold font-neutra text-xl text-blueText"
          >
            <li>
              <Link
                to="/perfil"
                className="py-3 uppercase flex items-center justify-between"
              >
                Mi Cuenta
                <div className="">
                  <Arrow className="h-4" />
                </div>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/favoritos"
                className="py-3 uppercase flex items-center justify-between"
              >
                Mis Favoritos
                <div className="">
                  <Arrow className="h-4" />
                </div>
              </Link>
            </li> */}
            <li>
              <Link
                to="/perfil/history"
                className="py-3 uppercase flex items-center justify-between"
              >
                Historial de Compra
                <div className="">
                  <Arrow className="h-4" />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/perfil/payment"
                className="py-3 uppercase flex items-center justify-between"
              >
                Método de Pago
                <div className="">
                  <Arrow className="h-4" />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/perfil/address"
                className="py-3 uppercase flex items-center justify-between"
              >
                Mis Direcciones
                <div className="">
                  <Arrow className="h-4" />
                </div>
              </Link>
            </li>
            <li>
              <span
                onClick={() => auth.signout()}
                className="py-3 uppercase flex items-center justify-between"
              >
                Cerrar sesión
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={` fixed w-full px-5 lg:px-0 pb-5 lg:pb-20 bg-white ease-in-out transition-all duration-300 transform z-50 ${
          openSearch ? "top-24 translate-y-0" : " -translate-y-full"
        }`}
      >
        <div className="container mx-auto lg:px-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchValue.trim() !== "") {
                setOpenSearch(false);
                history.push(`/busqueda?search=${searchValue}`);
              }
            }}
            className="mt-10 flex flex-col lg:flex-row lg:border-b border-grayText2 pb-6"
          >
            <span className="border-b lg:border-none w-full">
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full appearance-none lg:text-2xl focus:outline-none lg:pr-10 border-0 focus:ring-0"
                placeholder="Buscar productos o categorías..."
              />
            </span>
            <button
              type="submit"
              className="text-white bg-black font-bold px-8 py-2 flex items-center justify-center mt-5 lg:mt-0 text-center"
            >
              BUSCAR
            </button>
          </form>
        </div>
      </div>

      <aside
        className={`transform mt-24 pb-5 right-0 w-screen bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 flex flex-col ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 min-h-full">
          <p className="pb-3 pt-5 font-circular font-medium">Categorías</p>
          <ul
            onClick={() => setMobileMenu(false)}
            className="font-bold font-neutra text-2xl text-blueText"
          >
            {categories &&
              categories?.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/productos/categorias/${category.value}`}
                    className="py-3 uppercase flex items-center justify-between"
                  >
                    {category.label}
                    <div className="">
                      <Arrow className="h-4" />
                    </div>
                  </Link>
                </li>
              ))}
          </ul>

          <div className="py-10">
            <p className=" text-blackText">mikesa@mikemike.com.sv</p>
            <p className=" text-blackText mt-5">(503) 2271-8999</p>
            <p className=" text-blackText mt-5">
              Industrias Mike Mike S.A. de C.V. <br />
              NIT: 0614-100965-001-6
            </p>
            <div className="flex mt-8 space-x-10">
              <a
                href="https://www.facebook.com/mikemikesv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fb} alt="" className="h-5 cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/mikemikesv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={ig} alt="" className="h-5 cursor-pointer" />
              </a>
              <a
                href="https://www.wppredirect.tk/go/?p=50378774049&m="
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={wa} alt="" className="h-5 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </aside>

      {(openLogin ||
        openRegister ||
        open1 ||
        open2 ||
        open3 ||
        open5 ||
        open6 ||
        open4 ||
        openSearch) && (
        <div
          onClick={() => {
            setOpenLogin(false);
            setOpenRegister(false);
            setOpenSearch(false);
          }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
}
