import React, { useEffect, useRef, useState } from "react";
import arrow from "../../../assets/images/general/arrow-banner.svg";
import Slider from "react-slick";
import axios from "axios";

export default function BannersSlider() {
  const [banners, setBanners] = useState([]);
  const slider = useRef(null);
  const slider2 = useRef(null);
  const [current, setCurrent] = useState(0);

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setCurrent(next);
    },
    appendDots: (dots) => (
      <div>
        <div className="h-14 flex justify-center space-x-5">
          {dots.map((item, index) => {
            return (
              <div key={index} className="flex w-2 h-2">
                {item.props.children}
              </div>
            );
          })}
        </div>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-2 h-2 border-2 bg-black rounded-full transition-all duration-300 cursor-pointer ${
          i === current ? "opacity-100 " : " opacity-40"
        }`}
      ></div>
    ),
  };

  const settings2 = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_FIREBASE}/settings/mainPageGallery.json`
      )
      .then((response) => {
        setBanners(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div className="px-5 lg:px-20 2xl:px-24 container mx-auto">
      <div className="relative hidden lg:block">
        <div
          className="absolute left-0 flex h-full items-center transform rotate-180 z-20 ml-5 cursor-pointer"
          onClick={() => previous()}
        >
          <img src={arrow} alt="" className="h-10" />
        </div>
        <div
          className="absolute right-0 flex h-full items-center z-20 mr-5 cursor-pointer"
          onClick={() => next()}
        >
          <img src={arrow} alt="" className="h-10" />
        </div>
        <Slider ref={slider} {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="focus:outline-none">
              <img
                src={banner.image_url}
                alt=""
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="relative lg:hidden">
        <Slider ref={slider2} {...settings2}>
          {banners.map((banner, index) => (
            <div key={index} className="focus:outline-none">
              <img
                src={banner.image_url}
                alt=""
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
