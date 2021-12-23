import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import loginImage from "../../assets/images/login.jpg";
import { useAuth } from "../../context/user-auth";
import arrowSimple from "../../assets/images/general/arrow-simple.svg";
import { useForm } from "react-hook-form";
import ModalRestorePassword from "./ModalRestorePassword";

export default function Login({ openLogin, setOpenLogin, setOpenRegister }) {
  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  let auth = useAuth();

  const { register, handleSubmit, errors } = useForm();

  let { from } = location.state || { from: { pathname: "/" } };

  const login = async (data) => {
    setIsLoading(true);
    setError("");
    const res = await auth.signin(data, () => {
      history.replace(from);
    });
    setIsLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setOpenLogin(false);
  };

  const onSubmit = (data) => login(data);

  return (
    <div
      className={`mt-24 fixed w-full pb-10 bg-white ease-in-out transition-all duration-300 transform z-40 h-full lg:h-auto overflow-auto ${
        openLogin && !auth.user ? "translate-y-0" : " -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row min-h-full">
        <div className="lg:w-1/2 flex justify-center order-2 lg:order-1 mt-20 lg:mt-0">
          <div className="">
            <img src={loginImage} alt="" className=" w-52 lg:w-80" />
          </div>
        </div>
        <div className="lg:w-1/2 px-5 lg:px-0 pt-10 lg:pt-20 order-1 lg:order-2">
          <p className=" text-blackText text-2xl text-center lg:text-left font-bold">
            Iniciar Sesión
          </p>
          <div className="max-w-md mt-10 mx-auto xl:mx-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                name="email"
                className=" bg-grayFooter py-2 px-3 w-full focus:outline-none border-0 focus:ring-0"
                placeholder="Correo"
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className=" text-red text-sm pl-1 mt-2">
                  Tiene que escribir un correo.
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
              {error && (
                <span className="block text-red text-sm pl-1 mt-4">
                  {error}
                </span>
              )}
              <button
                disabled={isLoading}
                className=" bg-yellow py-3 flex justify-center items-center relative mt-5 focus:outline-none w-full font-bold"
              >
                {isLoading ? "Cargando..." : "ENTRAR"}{" "}
                <img
                  src={arrowSimple}
                  alt=""
                  className="absolute right-0 mr-3 h-4"
                />
              </button>
            </form>
            <div className="mt-8 flex flex-col lg:flex-row justify-between">
              <button
                onClick={() => setOpenModal(true)}
                className=" focus:outline-none text-blackText"
              >
                ¿Olvidó su contraseña?
              </button>
              <button
                onClick={() => {
                  setOpenRegister(true);
                  setOpenLogin(false);
                }}
                className=" focus:outline-none uppercase font-bold text-blackText underline mt-5 lg:mt-0"
              >
                crear una cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalRestorePassword openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
