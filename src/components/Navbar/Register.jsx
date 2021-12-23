import React, { useState } from "react";
import arrowSimple from "../../assets/images/general/arrow-simple.svg";
import registerImage from "../../assets/images/register.jpg";
import Modal from "react-modal";
import modalClose from "../../assets/images/icons/close-modal.svg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuth } from "../../context/user-auth";

export default function Register({
  openRegister,
  setOpenLogin,
  setOpenRegister,
}) {
  let auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [termChecked, setTermChecked] = useState(false);

  const signup = async (data) => {
    if (termChecked) {
      setIsLoading(true);
      setError("");
      const res = await auth.signup(data, () => history.push("/"));

      setIsLoading(false);

      if (res?.error) {
        setError(res.error);
        return;
      }

      setOpenRegister(false);
    } else {
      setError("Aceptar los términos y condicionces");
    }
  };

  const onSubmit = (data) => signup(data);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      background: "transparent",
    },
    overlay: {
      background: "rgba(4,4,4,0.3)",
      zIndex: "100",
    },
  };

  return (
    <div
      className={`mt-24 fixed w-full pb-10 bg-white ease-in-out transition-all duration-300 transform z-40 h-full lg:h-auto overflow-auto ${
        openRegister ? "translate-y-0" : " -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row min-h-full">
        <div className="lg:w-1/2 flex justify-center items-end order-2 lg:order-1 mt-10 lg:mt-0">
          <div className="">
            <img src={registerImage} alt="" className=" w-52 lg:w-80" />
          </div>
        </div>
        <div className="lg:w-1/2 px-5 lg:px-0 pt-10 lg:pt-20 order-1 lg:order-2">
          <p className=" text-blackText text-2xl text-center lg:text-left font-bold">
            Crear una cuenta
          </p>
          <div className="max-w-md mt-10 mx-auto xl:mx-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                name="firstname"
                className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0"
                placeholder="Nombre"
                ref={register({ required: true })}
              />
              {errors.firstname && (
                <span className=" text-red text-sm pl-1 mt-2">
                  Tiene que escribir su nombre.
                </span>
              )}
              <input
                type="text"
                name="lastname"
                className=" bg-grayFooter appearance-none py-2 px-3 w-full mt-4 focus:outline-none border-0"
                placeholder="Apellido"
                ref={register({ required: true })}
              />
              {errors.lastname && (
                <span className=" text-red text-sm pl-1 mt-2">
                  Tiene que escribir su apellido.
                </span>
              )}
              <input
                type="email"
                name="email"
                className=" bg-grayFooter appearance-none py-2 px-3 w-full mt-4 focus:outline-none border-0"
                placeholder="Correo"
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className=" text-red text-sm pl-1 mt-2">
                  Tiene que escribir su correo.
                </span>
              )}
              <input
                type="password"
                name="password"
                className=" bg-grayFooter appearance-none py-2 px-3 w-full mt-4 focus:outline-none border-0"
                placeholder="Contraseña"
                ref={register({ required: true })}
              />
              {errors.password && (
                <span className=" text-red text-sm pl-1 mt-2">
                  Tiene que escribir una contraseña.
                </span>
              )}
              {/* <div className="mt-4 flex items-center">
                <input
                  type="radio"
                  className="h-5 w-5 text-yellow mr-2"
                  checked={true}
                />{" "}
                <span className=" text-sm">
                  Subscribirse al boletín y recibir ofertas
                </span>
              </div> */}
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="h-5 w-5 text-yellow mr-2"
                  checked={termChecked}
                  onChange={() => setTermChecked(!termChecked)}
                />{" "}
                <label htmlFor="terms" className=" text-sm">
                  Acepto las{" "}
                  <span
                    onClick={() => setModalIsOpen(true)}
                    className="underline cursor-pointer"
                  >
                    condiciones generales
                  </span>{" "}
                  y la política de confidencialidad.
                </label>
              </div>
              {error && (
                <span className="block text-red text-sm pl-1 mt-4">
                  {error}
                </span>
              )}
              <button
                disabled={isLoading}
                className=" bg-yellow py-3 flex justify-center items-center relative mt-5 focus:outline-none w-full font-bold"
              >
                {isLoading ? "Cargando..." : "CREAR CUENTA"}{" "}
                <img
                  src={arrowSimple}
                  alt=""
                  className="absolute right-0 mr-3 h-4"
                />
              </button>
            </form>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  setOpenRegister(false);
                  setOpenLogin(true);
                }}
                className="focus:outline-none text-blackText uppercase text-center underline font-bold"
              >
                ya tengo una cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Terms and Conditions Modal"
      >
        <div className="w-80 lg:w-96 relative bg-white pt-5">
          <img
            onClick={() => setModalIsOpen(false)}
            src={modalClose}
            alt=""
            className="absolute right-0 h-8 w-8 -mt-8 -mr-4"
          />
          <h3 className=" text-2xl text-blackText text-center">
            Terms and Conditions
          </h3>
          <div className=" h-96 overflow-y-auto px-4 mt-5 pb-10">
            <p>AGREEMENT TO TERMS</p>
            <p className="mt-5 text-sm">
              These Terms and Conditions constitute a legally binding agreement
              made between you, whether personally or on behalf of an entity
              (“you”) and [business entity name] (“we,” “us” or “our”),
              concerning your access to and use of the [website name.com]
              website as well as any other media form, media channel, mobile
              website or mobile application related, linked, or otherwise
              connected thereto (collectively, the “Site”).
            </p>
            <p className="mt-5 text-sm">
              You agree that by accessing the Site, you have read, understood,
              and agree to be bound by all of these Terms and Conditions. If you
              do not agree with all of these Terms and Conditions, then you are
              expressly prohibited from using the Site and you must discontinue
              use immediately.
            </p>
            <p className="mt-5 text-sm">
              Supplemental terms and conditions or documents that may be posted
              on the Site from time to time are hereby expressly incorporated
              herein by reference. We reserve the right, in our sole discretion,
              to make changes or modifications to these Terms and Conditions at
              any time and for any reason.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
