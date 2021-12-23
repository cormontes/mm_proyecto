import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/general/logo-navbar.svg";
import position from "../../assets/images/icons/position.svg";
import close from "../../assets/images/icons/close.svg";
import plus from "../../assets/images/icons/plus.svg";
import blank from "../../assets/images/blank.png";
import wompi from "../../assets/images/wompi.svg";
import visamaster from "../../assets/images/visa-master.png";
import AES256 from "aes-everywhere";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/user-auth";
import { removeItemFromCart, updateCart } from "../../services/updateCart";
import { toast } from "react-toastify";
import { ReactComponent as ArrowSimple } from "../../assets/images/general/arrow-simple.svg";
import { applyCoupon, createOrder } from "./services";
import ModalAddAddress from "../Profile/Address/ModalAddAddress";
import ModalEditAddress from "../Profile/Address/ModalEditAddress";
import Payment from "payment";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import axios from "axios";
import { useSettings } from "../../context/settings";

export default function Checkout() {
  const [step, setStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [modalAddAddress, setModalAddAddress] = useState(false);
  const [modalEditAddress, setModalEditAddress] = useState(false);
  const [addressSelected, setAddressSelected] = useState({});
  const [addressToEdit, setAddressToEdit] = useState({});
  const [couponApplied, setCouponApplied] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const [discount, setDiscount] = useState(0);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  // const [cardSelected, setCardSelected] = useState({});
  // const [modalAddCard, setModalAddCard] = useState(false);
  // const [modalDeleteCard, setModalDeleteCard] = useState(false);
  // const [idToDelete, setIdToDelete] = useState(null);

  const history = useHistory();

  const [cart, setCart] = useContext(CartContext);
  const { settings } = useSettings();
  const { user } = useAuth();

  const ERROR_MESSAGES = {
    emptyCardNumber: "El número de la tarjeta es inválido",
    invalidCardNumber: "El número de la tarjeta es inválido",
    emptyExpiryDate: "La fecha de expiración es inválida",
    monthOutOfRange: "El mes de expiración debe estar entre 01 y 12",
    yearOutOfRange: "El año de expiración no puede estar en el pasado",
    dateOutOfRange: "La fecha de expiración no puede estar en el pasado",
    invalidExpiryDate: "La fecha de expiración es inválida",
    emptyCVC: "El código de seguridad es inválido",
    invalidCVC: "El código de seguridad es inválido",
  };

  const cardNumberValidator = ({ cardType }) => {
    if (
      cardType.displayName === "Visa" ||
      cardType.displayName === "Mastercard"
    ) {
      return;
    }
    return "La tarjeta debe ser Visa o Mastercard.";
  };

  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES,
    cardNumberValidator,
  });

  const onSubmit = async () => {
    if (!meta.error) {
      if (name.trim() !== "") {
        setIsLoading(true);
        let explodedDate = expiryDate.split(" / ");
        let expiryMonth = explodedDate[0];
        let expiryYear = explodedDate[1];
        let cardBrand = Payment.fns.cardType(cardNumber);

        let cardSelected = {
          name: name,
          brand: AES256.encrypt(
            cardBrand,
            process.env.REACT_APP_ENCRYPTION_KEY
          ),
          number: AES256.encrypt(
            cardNumber.replace(/\s/g, ""),
            process.env.REACT_APP_ENCRYPTION_KEY
          ),
          expiry_month: AES256.encrypt(
            expiryMonth,
            process.env.REACT_APP_ENCRYPTION_KEY
          ),
          expiry_year: AES256.encrypt(
            expiryYear,
            process.env.REACT_APP_ENCRYPTION_KEY
          ),
          cvv: AES256.encrypt(cvc, process.env.REACT_APP_ENCRYPTION_KEY),
        };

        try {
          const res = await createOrder(
            user,
            addressSelected,
            cardSelected,
            cart,
            shippingCost,
            discount,
            coupon,
            settings
          );

          if (res.status >= 200 && res.status < 300 && !res.data?.error) {
            localStorage.removeItem("mm-cart");
            setCart({});
            history.push(`/completed`, { order: res.data });
          } else {
            toast.error(
              "La transacción fue rechazada por el banco, te contactaremos en seguida para continuar tu proceso de compra."
            );
            setIsLoading(false);
          }
        } catch (error) {
          toast.error("Algo salió mal, inténtalo de nuevo más tarde.");
        }
      } else {
        toast.error("Escriba el nombre del propietario de la tarjeta.");
      }
    } else {
      toast.error(meta.error);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const res = await applyCoupon(user, coupon);

      if (res?.status >= 200 && res?.status < 300 && !res.data?.error) {
        if (res.data.isWebEnabled === 1) {
          if (cart.totalProductsPrice >= res.data.minAmount) {
            if (res.data.maxAmount !== 0) {
              if (cart.totalProductsPrice <= res.data.maxAmount) {
                calculateCoupon(res.data);
                setCouponApplied(res.data);
              } else {
                toast.error(
                  `El cupón ${coupon} aplica a un monto máximo de $${res.data.maxAmount}.`
                );
              }
            } else {
              calculateCoupon(res.data);
              setCouponApplied(res.data);
            }
          } else {
            toast.error(
              `El cupón ${coupon} requiere un monto mínimo de $${res.data.minAmount}.`
            );
          }
        } else {
          toast.error(`El cupón ${coupon} no es válido desde la web.`);
        }
      } else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      toast.error("Algo salió mal, inténtalo de nuevo.");
      throw error;
    }
  };

  const calculateCoupon = (coupon) => {
    if (coupon?.isFreeDelivery === 1) {
      setShippingCost(0);
    } else {
      if (coupon?.type === "K") {
        let discountRate = coupon.value / 100;

        let discountValue = cart?.totalProductsPrice * discountRate;

        setDiscount(Number(discountValue.toFixed(2)));
      } else {
        toast.error("Algo salió mal, inténtalo de nuevo.");
        setCouponApplied(null);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [step]);

  useEffect(() => {
    if (coupon) {
      calculateCoupon(couponApplied);
    }
    // eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    calculateShippingCost();
    setAddressSelected(user?.client?.addresses[0]);
    // setCardSelected(user?.client?.cards[0]);
    // eslint-disable-next-line
  }, []);

  const calculateShippingCost = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_FIREBASE}/settings/fixedShippingCost.json`
      )
      .then((res) => {
        setShippingCost(res.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div>
      <div className="sticky top-0 z-50 font-neutra w-full bg-white">
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

      <div className="container mx-auto flex flex-col lg:flex-row px-5 lg:px-0">
        <div className="flex-1 pt-10 lg:pt-16 lg:border-r border-grayText2 h-full">
          <div className="inline-flex bg-black lg:px-10 py-5 lg:py-3 text-xs lg:text-base w-full lg:w-auto justify-center">
            <div className="flex items-center text-white">
              Carrito
              <div className="">
                <ArrowSimple className="ml-3 lg:ml-5 fill-current h-4" />
              </div>
            </div>
            <div
              className={`flex items-center ml-5 lg:ml-10 ${
                step >= 1 ? "text-white" : " text-grayText"
              }`}
            >
              Dirección
              <div className="">
                <ArrowSimple className="ml-3 lg:ml-5 fill-current h-4" />
              </div>
            </div>
            <div
              className={`flex items-center text-white ml-5 lg:ml-10 ${
                step >= 2 ? "text-white" : " text-grayText"
              }`}
            >
              Método de Pago
            </div>
          </div>

          {step === 0 && (
            <div className="mt-10 lg:pr-20">
              <div className="border-t border-b border-grayText2 py-3 hidden lg:flex">
                <div className="w-6/12">Producto</div>
                <div className="w-3/12 text-center">Cantidad</div>
                <div className="w-2/12 text-center">Precio</div>
                <div className="w-1/12"></div>
              </div>

              {cart?.products?.map((data, index) => (
                <ListItem data={data} key={index} />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="mt-10 lg:pr-20">
              <h2 className="lg:text-xl text-blackText border-b-2 pb-4 font-bold">
                Direcciones guardadas
              </h2>

              {user.client?.addresses.map((values, index) => (
                <React.Fragment key={index}>
                  <div className="mt-5 border-b border-grayText2 pb-10 hidden lg:flex">
                    <div className="w-1/4 relative">
                      <div className="absolute -ml-10 2xl:-ml-20">
                        <input
                          type="radio"
                          className="h-5 w-5 text-yellow mr-2"
                          checked={addressSelected?.id === values.id}
                          onChange={() => {
                            setAddressSelected(values);
                          }}
                        />
                      </div>
                      <p className=" font-bold">Dirección</p>
                      <div className="mt-5 flex items-center">
                        <img src={position} alt="" className="h-6 mr-3" />
                        <p className=" font-bold">{values.name}</p>
                      </div>
                    </div>
                    <div className="w-1/4 pr-5">
                      <p className="font-bold">{values.address}</p>
                      <p className="mt-5 font-bold">{`${values.firstname} ${values.lastname}`}</p>
                    </div>
                    <div className="w-1/4 pl-5 font-bold">
                      {values.reference_point}
                    </div>
                    <div className="w-1/4 flex justify-end">
                      <p
                        onClick={() => {
                          setModalEditAddress(true);
                          setAddressToEdit(values);
                        }}
                        className="text-grayText2 cursor-pointer underline"
                      >
                        Editar
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 border-b border-grayText2 pb-10 lg:hidden">
                    <div className="flex justify-between relative">
                      <div className="absolute -ml-3 2xl:-ml-20">
                        <input
                          type="radio"
                          className="h-5 w-5 text-yellow mr-2"
                          checked={addressSelected?.id === values.id}
                          onChange={() => {
                            setAddressSelected(values);
                          }}
                        />
                      </div>
                      <div className="flex items-center ml-5">
                        <img src={position} alt="" className="h-6 mr-3" />
                        <p className=" font-bold">{values.name}</p>
                      </div>
                      <p
                        onClick={() => {
                          setModalEditAddress(true);
                          setAddressToEdit(values);
                        }}
                        className="text-grayText2 cursor-pointer underline"
                      >
                        Editar
                      </p>
                    </div>
                    <div className="flex justify-between mt-5">
                      <p className=" font-bold">Dirección:</p>
                      <p className="font-bold w-2/4">{values.address}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <div className="lg:mt-10">
                <button
                  onClick={() => setModalAddAddress(true)}
                  className=" w-full lg:w-auto flex items-center justify-center lg:bg-black lg:text-white py-3 px-5 mt-5 font-neutra font-bold text-sm border-2 lg:border-none"
                >
                  <img
                    src={plus}
                    alt=""
                    className="mr-2 h-5 hidden lg:inline"
                  />{" "}
                  AGREGAR DIRECCIÓN
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-10 lg:pr-20">
              <h2 className="text-xl text-blackText border-b-2 pb-4 font-bold">
                Método de Pago
              </h2>

              <div className="mt-10 max-w-xl mx-auto">
                <input
                  type="text"
                  className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 uppercase"
                  placeholder="Nombre de tarjeta*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="bg-grayFooter px-3 mt-4 flex items-center py-2">
                  <svg
                    {...getCardImageProps({ images })}
                    className="flex-shrink-0"
                  />
                  <input
                    {...getCardNumberProps({
                      onChange: (e) => setCardNumber(e.target.value),
                    })}
                    value={cardNumber}
                    placeholder="0000 0000 0000 0000"
                    className="bg-transparent appearance-none  w-full focus:outline-none border-0 focus:ring-0"
                  />
                </div>

                <div className="flex justify-between space-x-2">
                  <input
                    {...getExpiryDateProps({
                      onChange: (e) => setExpiryDate(e.target.value),
                    })}
                    value={expiryDate}
                    className="bg-grayFooter appearance-none py-2 px-3 mt-4 w-1/2 focus:outline-none border-0 focus:ring-0"
                  />
                  <input
                    {...getCVCProps({
                      onChange: (e) => setCvc(e.target.value),
                    })}
                    value={cvc}
                    className="bg-grayFooter appearance-none py-2 px-3 mt-4 w-1/2 focus:outline-none border-0 focus:ring-0"
                  />
                </div>

                {meta.isTouched && meta.error && (
                  <span className="block text-red mt-2">{meta.error}</span>
                )}

                <img src={visamaster} alt="" className="h-10 mt-5" />

                <div className="mt-5">
                  <p className=" text-lg">
                    *No estamos guardando ninguna informacion de tu tarjeta.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-96 mt-16 lg:pl-10 pb-20 lg:pb-0">
          <div className="hidden lg:block">
            <p className=" font-bold">{cart?.products?.length} PRODUCTO(S)</p>
          </div>

          {cart && (
            <>
              <div className=" bg-grayFooter p-5 mt-4">
                <div className="">
                  <div className="flex font-bold">
                    <div className=" w-52">SUBTOTAL</div>
                    <div className="">
                      ${cart?.totalProductsPrice?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  <div className="flex mt-5 lg:mt-3 font-bold">
                    <div className=" w-52">COSTO ENVÍO</div>
                    <div className="">${shippingCost?.toFixed(2)}</div>
                  </div>

                  {couponApplied ? (
                    <>
                      {couponApplied.isFreeDelivery === 0 ? (
                        <>
                          <div className="flex justify-between mt-5 lg:mt-3 font-bold">
                            <div className=" w-52">CUPÓN ({coupon})</div>
                            <div
                              onClick={() => {
                                setDiscount(0);
                                setCouponApplied(null);
                                calculateShippingCost();
                              }}
                              className="h-5 cursor-pointer"
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 329.26933 329"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex mt-5 lg:mt-3 font-bold">
                            <div className=" w-52">DESCUENTO</div>
                            <div className="">-${discount.toFixed(2)}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between mt-5 lg:mt-3 font-bold">
                            <div className=" w-52">CUPÓN ({coupon})</div>
                            <div
                              onClick={() => {
                                setDiscount(0);
                                setCouponApplied(null);
                                calculateShippingCost();
                              }}
                              className="h-5 cursor-pointer"
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 329.26933 329"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                              </svg>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className=" bg-white mt-5 lg:mt-3 flex items-center justify-between font-bold">
                      <input
                        type="text"
                        className=" appearance-none bg-white border-none text-sm lg:text-base active:outline-none"
                        placeholder="CUPÓN"
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className=" text-pinkDark underline cursor-pointer mr-3 text-center"
                      >
                        APLICAR
                      </button>
                    </div>
                  )}

                  <div className="flex mt-5 lg:mt-3">
                    <div className=" w-52 font-bold">TOTAL</div>
                    <div className=" font-bold text-lg">
                      $
                      {(
                        cart?.totalProductsPrice +
                        shippingCost -
                        discount
                      )?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (step < 2) {
                    if (user) {
                      setStep((step) => step + 1);
                    } else {
                      history.push("/login");
                    }
                  } else {
                    onSubmit();
                  }
                }}
                disabled={isLoading}
                className="bg-yellow py-3 w-full font-neutra font-bold mt-4"
              >
                {user ? (
                  <>
                    {step < 2 && "CONFIRMAR"}
                    {step >= 2 &&
                      (isLoading ? "CARGANDO..." : "PROCEDER AL PAGO")}
                  </>
                ) : (
                  "INICIAR SESIÓN"
                )}
              </button>
            </>
          )}

          <Link
            to="/"
            className="bg-white py-2 w-full block text-center font-neutra font-bold mt-4 underline"
          >
            REGRESAR A LA TIENDA
          </Link>

          <img src={wompi} alt="" className="h-10 mt-5 mx-auto" />
        </div>
      </div>

      <ModalAddAddress
        modalAddAddress={modalAddAddress}
        setModalAddAddress={setModalAddAddress}
      />

      <ModalEditAddress
        modalEditAddress={modalEditAddress}
        setModalEditAddress={setModalEditAddress}
        dataDefault={addressToEdit}
      />
    </div>
  );
}

export function ListItem({ data }) {
  const [qty, setQty] = useState(data.qty);
  const [, setCart] = useContext(CartContext);

  const handleRemoveProduct = (id) => {
    const updatedCart = removeItemFromCart(id);

    setCart(updatedCart);
  };

  const add = () => {
    setQty(qty + 1);
  };

  const remove = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  useEffect(() => {
    //Update Cart
    const handleQtyChange = () => {
      let existingCart = localStorage.getItem("mm-cart");
      existingCart = JSON.parse(existingCart);

      const updatedCart = updateCart(existingCart, data, false, qty);

      setCart(updatedCart);
    };

    handleQtyChange();
    // eslint-disable-next-line
  }, [qty]);

  return (
    <div className="py-4 flex items-center justify-between border-b border-grayText2">
      <div className="w-3/4 lg:w-6/12 flex items-center">
        <div className="flex-shrink-0 ml-1">
          <img
            src={data?.image_url ? data?.image_url : blank}
            alt=""
            className="w-20"
          />
        </div>
        <p className="ml-1 text-sm pr-5 font-bold">{data.name}</p>
      </div>
      <div className="w-3/12 hidden lg:block">
        <div className={`flex justify-center w`}>
          <div className="bg-beige h-10 w-32 text-black flex items-center justify-center space-x-1 px-2">
            <span onClick={() => remove()} className="text-2xl cursor-pointer">
              -
            </span>
            <span className="text-center flex-1 font-bold">{data?.qty}</span>
            <span onClick={() => add()} className=" text-2xl cursor-pointer">
              +
            </span>
          </div>
        </div>
      </div>
      <div className="w-2/12 flex justify-center font-bold">
        ${data?.totalPrice?.toFixed(2)}
      </div>
      <div className="w-1/12 flex justify-center">
        <div
          onClick={() => handleRemoveProduct(data?.id)}
          className=" cursor-pointer"
        >
          <img src={close} alt="" />
        </div>
      </div>
    </div>
  );
}
