import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import { ReactComponent as ArrowSimple } from "../../assets/images/general/arrow-simple.svg";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";
import poligon from "../../assets/images/icons/poligon.svg";
import ModalSchedule from "./ModalSchedule";
import storeInformation from "./storeInformation.json";
import StoreCard from "./StoreCard";
import ContactForm from "./ContactForm";

export default function Contact() {
  const wrapperRef = useRef(null);
  const { pathname } = useLocation();
  const [modalSchedule, setModalSchedule] = useState(false);
  const [storeSelected, setStoreSelected] = useState({});
  const [openSelect2, setOpenSelect2] = useState(false);
  const [selected, setSelected] = useState("SAN SALVADOR");

  useEffect(() => {
    if (pathname === "/contactenos/lalibertad") {
      setSelected("LA LIBERTAD");
    } else if (pathname === "/contactenos/sansalvador") {
      setSelected("SAN SALVADOR");
    } else if (pathname === "/contactenos/sanmiguel") {
      setSelected("SAN MIGUEL");
    } else if (pathname === "/contactenos/sonsonate") {
      setSelected("SONSONATE");
    } else if (pathname === "/contactenos/santaana") {
      setSelected("SANTA ANA");
    } else if (pathname === "/contactenos/ahuachapan") {
      setSelected("AHUACHAPAN");
    } else if (pathname === "/contactenos/usulutan") {
      setSelected("USULUTAN");
    } else if (pathname === "/contactenos/chalatenango") {
      setSelected("CHALATENANGO");
    } else {
      setSelected("SAN SALVADOR");
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
    <div>
      <div className="container mx-auto flex flex-col lg:flex-row mt-10 lg:mt-20 pb-20 px-5 lg:px-0">
        <h2 className=" text-blueText text-2xl uppercase lg:hidden font-neutra font-bold pb-3">
          Sucursales
        </h2>
        <div className="mt-1 inline-block relative lg:ml-3 lg:hidden mb-5 lg:mb-0">
          <button
            onClick={() => setOpenSelect2(true)}
            className={`relative w-full bg-white px-4 py-2 cursor-default focus:outline-none focus:ring-0 flex items-center ${
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
              className="absolute w-full bg-white z-10 border-2"
            >
              <ul className="max-h-56 overflow-auto focus:outline-none focus:ring-0">
                <Link
                  to="/contactenos/sansalvador"
                  onClick={() => {
                    setSelected("SAN SALVADOR");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  SAN SALVADOR
                </Link>
                <Link
                  to="/contactenos/lalibertad"
                  onClick={() => {
                    setSelected("LA LIBERTAD");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  LA LIBERTAD
                </Link>
                <Link
                  to="/contactenos/sanmiguel"
                  onClick={() => {
                    setSelected("SAN MIGUEL");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  SAN MIGUEL
                </Link>
                <Link
                  to="/contactenos/sonsonate"
                  onClick={() => {
                    setSelected("SONSONATE");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  SONSONATE
                </Link>
                <Link
                  to="/contactenos/santaana"
                  onClick={() => {
                    setSelected("SANTA ANA");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  SANTA ANA
                </Link>
                <Link
                  to="/contactenos/ahuachapan"
                  onClick={() => {
                    setSelected("AHUACHAPAN");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  AHUACHAPAN
                </Link>
                <Link
                  to="/contactenos/usulutan"
                  onClick={() => {
                    setSelected("USULUTAN");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  USULUTAN
                </Link>
                <Link
                  to="/contactenos/sanvicente"
                  onClick={() => {
                    setSelected("SAN VICENTE");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  SAN VICENTE
                </Link>
                <Link
                  to="/contactenos/chalatenango"
                  onClick={() => {
                    setSelected("CHALATENANGO");
                    setOpenSelect2(false);
                  }}
                  className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                >
                  CHALATENANGO
                </Link>
              </ul>
            </div>
          )}
        </div>

        <div className="lg:w-72 hidden lg:block">
          <div className=" lg:w-56 bg-white border-2 border-blackText">
            <ul>
              <li>
                <Link
                  to="/contactenos/sansalvador"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  SAN SALVADOR
                  {pathname === "/contactenos/sansalvador" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/lalibertad"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  LA LIBERTAD
                  {pathname === "/contactenos/lalibertad" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/sanmiguel"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  SAN MIGUEL
                  {pathname === "/contactenos/sanmiguel" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/sonsonate"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  SONSONATE
                  {pathname === "/contactenos/sonsonate" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/santaana"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  SANTA ANA
                  {pathname === "/contactenos/santaana" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/ahuachapan"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  AHUACHAPAN
                  {pathname === "/contactenos/ahuachapan" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/usulutan"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  USULUTAN
                  {pathname === "/contactenos/usulutan" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/sanvicente"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  SAN VICENTE
                  {pathname === "/contactenos/sanvicente" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactenos/chalatenango"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  CHALATENANGO
                  {pathname === "/contactenos/chalatenango" && (
                    <div className="">
                      <ArrowSimple className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 lg:pb-20">
          <Switch>
            <Route exact path={`/contactenos`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "SS")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/sansalvador`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "SS")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/lalibertad`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "LI")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/sanmiguel`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "SM")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/sonsonate`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "SO")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/santaana`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "SA")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/ahuachapan`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "AH")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/usulutan`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "US")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/sanvicente`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "SV")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
            <Route exact path={`/contactenos/chalatenango`}>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 flex-wrap gap-3">
                {storeInformation
                  .filter((data) => data.departmentCode === "CH")
                  .map((data, index) => (
                    <StoreCard
                      data={data}
                      key={index}
                      setModalSchedule={setModalSchedule}
                      setStoreSelected={setStoreSelected}
                    />
                  ))}
              </div>
            </Route>
          </Switch>
        </div>
      </div>

      <ContactForm />

      <ModalSchedule
        storeSelected={storeSelected}
        openModal={modalSchedule}
        setOpenModal={setModalSchedule}
      />

      <NewsLetter />
      <Footer />
    </div>
  );
}
