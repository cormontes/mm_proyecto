import React, { useContext, useEffect, useRef, useState } from "react";
import wa from "../../assets/images/icons/wa.svg";
import blank from "../../assets/images/blank.png";
import Navbar from "../../components/Navbar";
import NewsLetter from "../../components/NewsLetter";
import Footer from "../../components/Footer";
import heart from "../../assets/images/icons/heart.svg";
import { ReactComponent as ArrowSimple } from "../../assets/images/general/arrow-simple.svg";
import Slider from "react-slick";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { removeItemFromCart, updateCart } from "../../services/updateCart";
import { addFirstProduct } from "../../services/addFirstProduct";
import Loader from "../../components/Loader";
import FullScreen from "./FullScreen";

export default function ProductDetails() {
  const slider1 = useRef(null);
  const sliderMobile = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [, setCart] = useContext(CartContext);
  const [fullScreen, setFullScreen] = useState(false);

  const [qty, setQty] = useState(0);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [variantSelected, setVariantSelected] = useState({});
  const history = useHistory();

  let { productId } = useParams();

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    swipeToSlide: false,
    beforeChange: (current, next) => {
      setCurrentPosition(next);
    },
  };

  const settingsMobile = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/inventory/getStoreArticles?key=${process.env.REACT_APP_API_KEY}&id=${productId}`
      )
      .then((response) => {
        if (response.data.rows[0]) {
          setProduct(response.data.rows[0]);
          setVariantSelected(response.data.rows[0].variants[0]);
          setIsLoading(false);
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });

    // eslint-disable-next-line
  }, [history]);

  const add = () => {
    setQty(qty + 1);
  };

  const remove = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      setQty(0);
      handleRemoveProduct();
    }
  };

  const handleRemoveProduct = () => {
    const updatedCart = removeItemFromCart(variantSelected.id);
    setCart(updatedCart);
  };

  useEffect(() => {
    //Update Cart
    const handleQtyChange = () => {
      let existingCart = localStorage.getItem("mm-cart");
      existingCart = JSON.parse(existingCart);

      const updatedCart = updateCart(existingCart, variantSelected, false, qty);

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
      let productExistInCart = false;
      existingCartParsed.products.forEach((product1) => {
        if (product1.id === variantSelected.id) {
          setQty(product1.qty);
          productExistInCart = true;
          return;
        }
      });
      if (!productExistInCart) {
        setQty(0);
      }
    }
  }, [history, variantSelected]);

  const handleAddToCartClick = () => {
    let existingCart = localStorage.getItem("mm-cart");

    if (existingCart) {
      existingCart = JSON.parse(existingCart);
      const qtyToBeAdded = 1;
      const updatedCart = updateCart(
        existingCart,
        variantSelected,
        qtyToBeAdded
      );
      setCart(updatedCart);
    } else {
      const newCart = addFirstProduct(variantSelected);
      setCart(newCart);
    }

    setQty(qty + 1);
  };

  return (
    <div className="lg:h-screen">
      <Navbar />

      <div className="flex flex-col lg:flex-row h-full pt-20 lg:pt-0">
        <div className="mt-10 lg:hidden">
          {!isLoading ? (
            <>
              {variantSelected?.gallery?.length > 1 ? (
                <>
                  <div className="relative">
                    <Slider ref={sliderMobile} {...settingsMobile} className="">
                      {variantSelected?.gallery
                        ?.slice(0, 4)
                        .map((image, key) => (
                          <div
                            key={key}
                            className="focus:outline-none mx-auto flex justify-center overflow-hidden"
                          >
                            <img
                              src={image.image_url || blank}
                              alt=""
                              className=" h-80 object-cover mx-auto"
                            />
                          </div>
                        ))}
                    </Slider>
                    <div
                      onClick={() => sliderMobile.current.slickPrev()}
                      className=" bg-grayFooter w-10 h-10 text-black flex justify-center items-center rounded-full cursor-pointer absolute left-5 top-1/2"
                    >
                      <ArrowSimple className="h-3 fill-current transform rotate-180" />
                    </div>
                    <div
                      onClick={() => sliderMobile.current.slickNext()}
                      className=" bg-yellow w-10 h-10 text-black flex justify-center items-center rounded-full cursor-pointer absolute right-5 top-1/2"
                    >
                      <ArrowSimple className="h-3 fill-current transform " />
                    </div>
                  </div>
                  <div className="px-5 h-full flex items-center mt-3 mb-5 space-x-4">
                    {variantSelected?.gallery?.slice(0, 4).map((image, key) => (
                      <div
                        key={key}
                        className=" focus:outline-none border h-20 w-20 overflow-hidden border-grayText2 cursor-pointer"
                      >
                        <img
                          onClick={() => {
                            sliderMobile.current.slickGoTo(key);
                          }}
                          src={image.image_url}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <img
                  src={variantSelected.image_url || blank}
                  alt=""
                  className="h-80 object-cover mx-auto mb-5"
                />
              )}
            </>
          ) : (
            <div className="flex h-80 w-full items-center justify-center">
              <Loader />
            </div>
          )}
        </div>

        <div className="lg:w-7/12 bg-white hidden lg:flex justify-end">
          {!isLoading ? (
            <>
              {variantSelected?.gallery?.length > 1 ? (
                <div className="flex justify-end items-center mt-10 lg:mt-0 2xl:w-9/12 pl-5">
                  <div className="flex-shrink-0 flex flex-col justify-between items-center h-128 ml-5">
                    <div
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`w-12 h-12 rounded-full shadow-lg flex justify-center items-center cursor-pointer z-10 mt-10 ${
                        isFavorite ? " bg-yellow" : " bg-white"
                      }`}
                    >
                      <img src={heart} alt="" className=" h-6 w-6" />
                    </div>

                    <span className=" font-bold text-blueText font-neutra text-xl">
                      {currentPosition + 1}/
                      {variantSelected?.gallery?.slice(0, 4).length}
                    </span>
                  </div>

                  <div className="w-full flex justify-center items-center relative">
                    {/* <div className="absolute inset-0 z-10"></div> */}
                    <div className="flex items-center h-96 2xl:h-128 w-full">
                      {variantSelected?.gallery && (
                        <Slider
                          ref={slider1}
                          {...settings}
                          className="w-full h-full"
                        >
                          {variantSelected?.gallery?.map((image, key) => (
                            <div
                              key={key}
                              className="focus:outline-none m-auto flex justify-center overflow-hidden h-full"
                            >
                              <img
                                src={image.image_url}
                                alt=""
                                className="h-96 2xl:h-128 w-96 2xl:w-128 object-cover mx-auto cursor-zoom"
                                onClick={() => {
                                  setCurrentPosition(key);
                                  setFullScreen(true);
                                }}
                              />
                            </div>
                          ))}
                        </Slider>
                      )}
                    </div>
                  </div>

                  <div className="px-5 h-full flex flex-col items-center justify-center">
                    {variantSelected?.gallery?.slice(0, 4).map((image, key) => (
                      <div
                        key={key}
                        className=" focus:outline-none border h-20 w-20 overflow-hidden border-grayText2 cursor-pointer mt-4"
                      >
                        <img
                          onClick={() => {
                            slider1.current.slickGoTo(key);
                          }}
                          src={image.image_url}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-end 2xl:w-9/12">
                  <div className="flex-shrink-0 flex flex-col justify-between items-center h-128 ml-5">
                    <div
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`w-12 h-12 rounded-full shadow-lg flex justify-center items-center cursor-pointer z-10 mt-10 ${
                        isFavorite ? " bg-yellow" : " bg-white"
                      }`}
                    >
                      <img src={heart} alt="" className=" h-6 w-6" />
                    </div>
                  </div>
                  <img
                    src={variantSelected.image_url || blank}
                    alt=""
                    className="h-128 object-cover mx-auto"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex w-full items-center justify-center">
              <Loader />
            </div>
          )}
        </div>

        <div className="lg:w-5/12 bg-beige p-5 lg:p-10 z-10 h-full lg:pt-24 pb-20 lg:pb-0">
          <p className=" underline text-beigeDark font-neutra font-bold lg:mt-5">
            {product?.group_level_one_name}
          </p>
          <p className="text-2xl text-blueText max-w-sm font-bold mt-5">
            {product?.name}
          </p>
          <div className="flex items-center mt-3 lg:mt-5">
            <p className=" font-bold text-2xl text-blueText mr-10">
              ${variantSelected?.final_price?.toFixed(2)}
            </p>
            {variantSelected?.offer_price !== 0 && (
              <p className=" text-grayText line-through text-2xl">
                ${variantSelected?.retail_price?.toFixed(2)}
              </p>
            )}
          </div>
          <p className=" uppercase mt-3 lg:mt-5">
            REF: {variantSelected?.internal_reference}
          </p>
          {variantSelected.available_balance > 0 && (
            <div className="inline-block py-2 px-3 bg-beigeDark font-neutra font-bold mt-3 lg:mt-5">
              EN STOCK
            </div>
          )}
          {product?.description && (
            <div
              className=" max-w-lg mt-3 lg:mt-5"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
          )}

          <div className="flex items-center justify-between max-w-lg mt-12">
            <form className="flex flex-wrap gap-3 w-1/2">
              {product?.variants?.map((variant, key) => (
                <input
                  key={key}
                  type="radio"
                  name="variant"
                  className="h-5 w-5"
                  style={{
                    color: variant.color,
                    backgroundColor: variant.color,
                  }}
                  checked={variantSelected?.id === variant.id}
                  onChange={() => {
                    setVariantSelected(variant);
                  }}
                />
              ))}
            </form>
            <div className="font-bold">{variantSelected?.variant}</div>
          </div>

          {qty < 1 ? (
            <>
              {variantSelected.available_balance > 0 ? (
                <button
                  onClick={handleAddToCartClick}
                  className="py-3 w-full max-w-lg bg-black text-white mt-5 font-neutra font-bold"
                >
                  AGREGAR A CARRITO
                </button>
              ) : (
                <span className="block bg-grayText2 py-3 w-full max-w-lg mt-5 font-neutra font-bold text-center text-black select-none">
                  AGOTADO
                </span>
              )}
            </>
          ) : (
            <div className="py-3 w-full max-w-lg bg-black text-white mt-5 flex items-center justify-center px-10">
              <button
                onClick={() => remove()}
                className=" text-2xl font-bold focus:outline-none  text-white"
              >
                -
              </button>
              <span className="text-center flex-1 text-white font-medium">
                {qty}
              </span>
              <button
                onClick={() => add()}
                className=" text-2xl font-bold focus:outline-none text-white"
              >
                +
              </button>
            </div>
          )}

          <div className="mt-5 lg:flex items-center hidden">
            Compartir
            <div className=" bg-white rounded-full h-10 w-10 flex items-center justify-center ml-4 cursor-pointer">
              <a
                href={`https://www.wppredirect.tk/go/?p=&m=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={wa} alt="" className="h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />

      <FullScreen
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        gallery={variantSelected?.gallery}
        currentPosition={currentPosition}
      />
    </div>
  );
}
