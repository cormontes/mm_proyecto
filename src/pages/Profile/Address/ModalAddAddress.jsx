import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useAuth } from "../../../context/user-auth";
import position from "../../../assets/images/icons/position.svg";
import axios from "axios";

export default function ModalAddAddress({
  modalAddAddress,
  setModalAddAddress,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useAuth();

  const schema = yup.object().shape({
    address: yup.string().trim().required(),
    reference_point: yup.string().trim().required(),
    addressName: yup.string().trim().required(),
    firstname: yup.string().trim().required(),
    lastname: yup.string().trim().required(),
    phone_number: yup.string().trim().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/cms/updateUser?token=${user.idToken}`,
        {
          user: {
            email: user.email,
          },
          client: {
            email: user.email,
          },
          clientAddress: {
            id: "", //si el es vacío se asociará una nueva dirección de envío al cliente, si tiene valor se le dará update.
            firstname: data.firstname,
            lastname: data.lastname,
            address_type: "R", //R - Residencia, E - Empresa
            address: data.address, //dirección
            city_name: data.city_name, //municipio
            state_name: data.state_name, //departamento,
            reference_point: data.reference_point, //punto de referencia
            geolocation: "",
            name: data.addressName,
            phone_number: data.phone_number,
            is_deleted_by_user: 0, // Si se manda 1, significa que la dirección ha sido eliminada por el usuario
          },
        }
      )
      .then((response) => {
        if (!response.data.error) {
          const actualUser = JSON.parse(localStorage.getItem("mm-user"));
          actualUser.client = response.data.client;
          setUser(actualUser);
          localStorage.setItem("mm-user", JSON.stringify(actualUser));
          setModalAddAddress(false);
        } else {
          setError("Algo salió mal. Inténtalo de nuevo más tarde.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Algo salió mal. Inténtalo de nuevo más tarde.");
        throw error;
      });
  };

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
    <Modal
      isOpen={modalAddAddress}
      onRequestClose={() => setModalAddAddress(false)}
      style={customStyles}
      contentLabel="Add Card Modal"
    >
      <div className="w-80 md:w-96 relative bg-white pt-5">
        <h3 className="text-xl text-blackText text-center font-neutra font-bold uppercase relative">
          <img src={position} alt="" className="absolute ml-5 h-8" />
          AGREGAR DIRECCIÓN
        </h3>
        <div className="px-4 mt-5 pb-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="address"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0"
              placeholder="Dirección de Entrega*"
              ref={register({ required: true })}
            />
            {errors.address && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir la dirección completa.
              </span>
            )}
            <input
              type="text"
              name="reference_point"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Punto de referencia*"
              ref={register({ required: true })}
            />
            {errors.reference_point && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir un punto de referencia.
              </span>
            )}
            <input
              type="text"
              name="city_name"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Municipio*"
              ref={register({ required: true })}
            />
            {errors.city_name && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir un municipio.
              </span>
            )}
            <input
              type="text"
              name="state_name"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Departamento*"
              ref={register({ required: true })}
            />
            {errors.state_name && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir un departamento.
              </span>
            )}
            <input
              type="text"
              name="addressName"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Nombre a tu dirección (casa, oficina, etc)"
              ref={register({ required: true })}
            />
            {errors.addressName && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir un nombre para la dirección.
              </span>
            )}
            <input
              type="text"
              name="firstname"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Nombre*"
              ref={register({ required: true })}
            />
            {errors.firstname && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir un nombre.
              </span>
            )}
            <input
              type="text"
              name="lastname"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Apellido*"
              ref={register({ required: true })}
            />
            {errors.lastname && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir un apellido.
              </span>
            )}
            <input
              type="text"
              name="phone_number"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Teléfono*"
              ref={register({ required: true })}
            />
            {errors.lastname && (
              <span className=" text-red text-sm pl-1 mt-2">
                Tiene que escribir un número de teléfono.
              </span>
            )}
            {/* <div className="mt-4 flex items-center">
              <input
                type="radio"
                className="h-5 w-5 text-yellow mr-2"
                checked={false}
              />{" "}
              <label htmlFor="" className=" text-sm">Fijar como predeterminada</label>
            </div> */}
            {error && (
              <span className="block text-red text-sm pl-1 mt-4">{error}</span>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className=" bg-yellow py-3 flex justify-center items-center relative mt-5 focus:outline-none w-full font-neutra font-bold"
            >
              {isLoading ? "Cargando..." : "GUARDAR"}
            </button>
            <button
              onClick={() => setModalAddAddress(false)}
              type="cancel"
              className=" bg-white py-3 flex justify-center items-center relative mt-4 focus:outline-none w-full font-neutra font-bold border-2"
            >
              CANCELAR
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
