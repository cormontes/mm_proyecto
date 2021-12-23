import React, { useEffect, useRef, useState } from "react";
import closeIcon from "../../assets/images/icons/close-modal.svg";
import { ReactComponent as ArrowSimple } from "../../assets/images/general/arrow-simple.svg";
import Slider from "react-slick";

export default function FullScreen({
  fullScreen,
  setFullScreen,
  gallery,
  currentPosition,
}) {
  const slider1 = useRef(null);
  const [current, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (currentPosition) {
      slider1.current.slickGoTo(currentPosition || 0);
      setCurrentPosition(currentPosition || 0);
    }
  }, [currentPosition]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    beforeChange: (current, next) => {
      setCurrentPosition(next);
    },
  };

  return (
    <div
      className={`fixed bg-white inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
        fullScreen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className=" w-full justify-center flex flex-col">
        <img
          onClick={() => {
            setFullScreen(false);
          }}
          src={closeIcon}
          alt=""
          className="h-12 cursor-pointer mb-8 2xl:mb-20 select-none"
        />

        <div className="container mx-auto relative">
          <Slider ref={slider1} {...settings} className="w-full h-full">
            {gallery?.map((image, key) => (
              <div
                key={key}
                className="focus:outline-none m-auto flex justify-center overflow-hidden"
              >
                <img
                  src={image.image_url}
                  alt=""
                  className="h-128 2xl:h-148 object-cover mx-auto"
                />
              </div>
            ))}
          </Slider>
          <div
            onClick={() => slider1.current.slickPrev()}
            className={`${
              current <= 0 ? "bg-grayFooter" : "bg-yellow"
            } w-12 h-12 text-black flex justify-center items-center rounded-full cursor-pointer absolute left-5 top-1/2`}
          >
            <ArrowSimple className="h-4 fill-current transform rotate-180" />
          </div>
          <div
            onClick={() => slider1.current.slickNext()}
            className={`${
              current >= gallery?.slice(0, 4).length - 1
                ? "bg-grayFooter"
                : "bg-yellow"
            } w-12 h-12 text-black flex justify-center items-center rounded-full cursor-pointer absolute right-5 top-1/2`}
          >
            <ArrowSimple className="h-4 fill-current transform " />
          </div>
        </div>

        <div className="mt-8 2xl:mt-20 mx-auto">
          <span className=" font-bold text-blueText text-2xl font-neutra select-none">
            {current + 1}/{gallery?.slice(0, 4).length}
          </span>
        </div>
      </div>
    </div>
  );
}
