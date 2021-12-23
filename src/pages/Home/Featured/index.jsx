import React, { useEffect, useMemo, useState } from "react";
import featured1 from "../../../assets/images/homepage/featured1.jpg";
import featured2 from "../../../assets/images/homepage/featured2.jpg";
import featured3 from "../../../assets/images/homepage/featured3.jpg";
import featured11 from "../../../assets/images/homepage/featured1-1.jpg";
import featured21 from "../../../assets/images/homepage/featured2-1.jpg";
import featured31 from "../../../assets/images/homepage/featured3-1.jpg";
import { ReactComponent as ArrowSimple } from "../../../assets/images/general/arrow-simple.svg";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function Featured() {
  let slider1 = useMemo(() => [], []);
  let slider2 = useMemo(() => [], []);
  let slider3 = useMemo(() => [], []);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [nav3, setNav3] = useState(null);

  const settings1 = {
    dots: false,
    arrows: false,
  };

  const settings2 = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="flex justify-start">
        <ul className="flex justify-start"> {dots} </ul>
      </div>
    ),
  };

  const settings3 = {
    dots: false,
    arrows: false,
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    setNav3(slider3);
  }, [slider1, slider2, slider3]);

  return (
    <div className="mt-20">
      <div className="container mx-auto">
        <div className="lg:flex lg:h-96">
          <div className="lg:w-4/5 bg-pink">
            <div className="h-20 lg:h-28 flex items-center">
              <p className=" text-2xl text-blackText ml-10 font-circular font-bold">
                Lo Más Destacado
              </p>
            </div>
            <div className="pl-5 lg:ml-10 flex max-w-full relative w-screen">
              <div className="w-44 lg:w-96">
                <Slider
                  asNavFor={nav2}
                  ref={(slider) => (slider1 = slider)}
                  {...settings1}
                >
                  <img src={featured1} alt="" className=" w-full h-full" />
                  <img src={featured2} alt="" className="w-full h-full" />
                  <img src={featured3} alt="" className="w-full h-full" />
                </Slider>
              </div>
              <div className="pl-5 lg:pl-10 2xl:pl-10 lg:max-w-md 2xl:max-w-xl h-32 lg:h-56 w-40 md:w-80 lg:w-auto">
                <Slider
                  asNavFor={nav3}
                  ref={(slider) => (slider2 = slider)}
                  {...settings2}
                >
                  <div className=" lg:h-56 focus:outline-none">
                    <p className="lg:text-3xl text-blackText font-circular font-bold">
                      CARTERA MIKE MIKE DORIA
                    </p>
                    <Link
                      to="/productos/detalles/1144"
                      className="py-3 px-3 my-3 ml-1 uppercase bg-pink border-2 border-black text-black flex items-center h-full justify-center font-bold focus:outline-none font-neutra text-sm lg:hidden"
                    >
                      ver más <ArrowSimple className="ml-3 h-4 fill-current" />
                    </Link>
                  </div>
                  <div className=" lg:h-56 focus:outline-none">
                    <p className="lg:text-3xl text-blackText font-circular font-bold">
                      MOCHILA GO PORTA LAPTOP JAB
                    </p>
                    <Link
                      to="/productos/detalles/810"
                      className="py-3 px-3 my-3 ml-1 uppercase bg-pink border-2 border-black text-black flex items-center h-full justify-center font-bold focus:outline-none font-neutra text-sm lg:hidden"
                    >
                      ver más <ArrowSimple className="ml-3 h-4 fill-current" />
                    </Link>
                  </div>
                  <div className=" lg:h-56 focus:outline-none">
                    <p className="lg:text-3xl text-blackText font-circular font-bold">
                      CARTERA MOCHILA MM IBIZA
                    </p>
                    <Link
                      to="/productos/detalles/745"
                      className="py-3 px-3 my-3 ml-1 uppercase bg-pink border-2 border-black text-black flex items-center h-full justify-center font-bold focus:outline-none font-neutra text-sm lg:hidden"
                    >
                      ver más <ArrowSimple className="ml-3 h-4 fill-current" />
                    </Link>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
          <div className="w-1/5 overflow-hidden hidden lg:block">
            <div className="">
              <Slider
                asNavFor={nav1}
                ref={(slider) => (slider3 = slider)}
                {...settings3}
              >
                <div className="">
                  <div className=" overflow-hidden h-72">
                    <img
                      src={featured11}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="h-24">
                    <Link
                      to="/productos/detalles/1144"
                      className="uppercase bg-black flex items-center h-full w-full justify-center text-white font-bold text-lg focus:outline-none font-neutra"
                    >
                      ver más <ArrowSimple className="ml-3 h-4 fill-current" />
                    </Link>
                  </div>
                </div>
                <div className="">
                  <div className=" overflow-hidden h-72">
                    <img
                      src={featured21}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="h-24">
                    <Link
                      to="/productos/detalles/810"
                      className="uppercase bg-black flex items-center h-full w-full justify-center text-white font-bold text-lg focus:outline-none font-neutra"
                    >
                      ver más <ArrowSimple className="ml-3 h-4 fill-current" />
                    </Link>
                  </div>
                </div>
                <div className="">
                  <div className=" overflow-hidden h-72">
                    <img
                      src={featured31}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="h-24">
                    <Link
                      to="/productos/detalles/745"
                      className="uppercase bg-black flex items-center h-full w-full justify-center text-white font-bold text-lg focus:outline-none font-neutra"
                    >
                      ver más <ArrowSimple className="ml-3 h-4 fill-current" />
                    </Link>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
