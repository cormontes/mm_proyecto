import React, { useRef } from "react";
import arrow from "../../../assets/images/general/arrow-right.svg";
import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick";

export default function NewProductSlider({products}) {
  const slider = useRef(null);

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div className="container mx-auto mt-8 hidden lg:block">
      <div className="relative">
        <div
          className="absolute left-0 flex h-full items-center transform rotate-180 z-20"
          onClick={() => previous()}
        >
          <img src={arrow} alt="" className="h-10 cursor-pointer" />
        </div>
        <div
          className="absolute right-0 flex h-full items-center z-20"
          onClick={() => next()}
        >
          <img src={arrow} alt="" className="h-10 cursor-pointer" />
        </div>
        <Slider ref={slider} {...settings}>
          {products?.map((value, index) => (
            <div className="focus:outline-none pb-5" key={index}>
              <div className="flex justify-center">
                <ProductCard data={value} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
