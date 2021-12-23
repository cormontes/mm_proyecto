import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/general/logo-navbar.svg";
import complete from "../../assets/images/general/completed.svg";
import completedslide from "../../assets/images/slider.png";
import completedslideRes from "../../assets/images/sliderRes.png";

export default function Completed() {
  const history = useHistory();

  useEffect(() => {
    if (!history.location.state?.order) {
      history.push("/");
    }
  }, [history]);

  return (
    <div className="h-screen flex flex-col justify-between overflow-hidden">
      <div className="sticky top-0 z-50 font-neutra w-full">
        <div className="relative">
          <div className={`h-24 shadow-md`}>
            <div className="container mx-auto h-full flex items-center px-5 lg:px-0">
              <div className="">
                <Link to="/">
                  <img src={logo} alt="" className="h-12" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-5 lg:px-0">
        <img src={complete} alt="" className="" />
        <p className=" text-center text-xl lg:text-3xl font-neutra font-bold uppercase mt-10">
          ¡Gracias por realizar <br className="lg:hidden" /> tu compra con
          nosotros!
        </p>
        <p className=" text-grayText mt-5 text-lg text-center">
          Te enviamos un email con un link a nuestra tienda,{" "}
          <br className="hidden lg:inline" /> para que puedas seguir la entrega
          de tu compra.
        </p>
        <p className=" uppercase mt-10 underline font-bold font-neutra">
          <Link to="/perfil/history">VER DETALLE DE LA COMPRA</Link>
        </p>
      </div>

      <div className="-mb-10 ">
        <img src={completedslide} alt="" className="hidden lg:block" />
        <img src={completedslideRes} alt="" className="lg:hidden" />
      </div>
    </div>
  );
}
