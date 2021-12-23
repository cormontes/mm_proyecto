import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import arrowSimple from "../../assets/images/general/arrow-simple.svg";
import Loader from "../../components/Loader";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/cms/contactUs?key=${process.env.REACT_APP_API_KEY}`,
        {
          data: {
            Nombre: data.name,
            Apellido: data.lastname,
            lastname: data.lastname,
            correo: data.email,
            Mensaje: data.message,
          },
        }
      )
      .then((res) => {
        if (res.data.success && !res.data.error) {
          setSuccessful(true);
        } else {
          setError("El servicio no está disponible. Inténtelo más tarde.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("El servicio no está disponible. Inténtelo más tarde.");
        setIsLoading(false);
        throw error;
      });
  };

  return (
    <div className="container mx-auto flex justify-center lg:border-t border-grayText2 pb-32 px-5 lg:px-0">
      <div className="lg:pt-20 flex flex-col justify-center">
        <h4 className=" font-neutra font-bold text-xl lg:text-2xl text-center">
          CONTACTE CON NOSOTROS
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mt-10">
          <input
            type="text"
            name="name"
            ref={register({ required: true })}
            className=" appearance-none bg-grayFooter w-full border-none "
            placeholder="Nombre"
          />
          {errors.name && (
            <span className=" text-red mt-2">*Este campo es requerido.</span>
          )}
          <input
            type="text"
            name="lastname"
            ref={register({ required: true })}
            className=" appearance-none bg-grayFooter w-full border-none mt-5"
            placeholder="Apellido"
          />
          {errors.lastname && (
            <span className=" text-red mt-2">*Este campo es requerido.</span>
          )}
          <input
            type="email"
            name="email"
            ref={register({ required: true })}
            className=" appearance-none bg-grayFooter w-full border-none mt-5"
            placeholder="Correo"
          />
          {errors.email && (
            <span className=" text-red mt-2">*Este campo es requerido.</span>
          )}
          <textarea
            rows={4}
            name="message"
            ref={register({ required: true })}
            className="appearance-none bg-grayFooter w-full border-none mt-5"
            placeholder="Mensaje"
          ></textarea>
          {errors.message && (
            <span className=" text-red mt-2">*Este campo es requerido.</span>
          )}

          <button
            disabled={isLoading}
            className="bg-yellow py-3 flex justify-center items-center relative mt-5 focus:outline-none w-full font-bold disabled:bg-grayText"
          >
            ENVIAR MENSAJE{" "}
            {isLoading ? (
              <div className="absolute right-2 top-2">
                <Loader />
              </div>
            ) : (
              <img
                src={arrowSimple}
                alt=""
                className="absolute right-0 mr-3 h-4"
              />
            )}
          </button>

          {successful && (
            <div className=" text-greenSuccess font-semibold mt-5 text-center">
              La operación se realizó exitosamente!
            </div>
          )}

          {error && (
            <div className=" text-red font-semibold mt-5 text-center">
              *{error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
