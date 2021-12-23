import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import axios from "axios";
import Modal from "react-modal";

export default function ModalRestorePassword({ openModal, setOpenModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const schema = yup.object().shape({
    email: yup.string().email().trim().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const body = {
      email: data.email,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cms/sendPasswordResetEmail?key=${process.env.REACT_APP_API_KEY}`,
        body
      );
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setSuccess(res.data.success);
      }
      setOpenModal(false);
    } catch (error) {
      setIsLoading(false);
      setError("Algo salió mal. Inténtalo de nuevo más tarde.");
      throw error;
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0,30,45, 0.5)",
      zIndex: 50,
    },
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      style={customStyles}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 bg-white rounded-lg p-5 flex flex-col items-center"
      >
        <h1 className="text-sblue-dark text-2xl text-center font-bold">
          Restablecer contraseña
        </h1>
        <input
          type="email"
          name="email"
          className=" bg-grayFooter py-2 px-3 w-full focus:outline-none border-0 focus:ring-0 mt-4"
          placeholder="Correo Electrónico"
          ref={register({ required: true })}
        />

        {errors.email && (
          <span className=" text-red text-sm pl-1 mt-2">
            Tiene que escribir un correo.
          </span>
        )}

        {error && (
          <span className="block text-red text-sm pl-1 mt-4">{error}</span>
        )}

        {success && (
          <span className="block text-greenSuccess text-sm pl-1 mt-4">
            {success}
          </span>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className=" px-8 py-2 bg-yellow focus:outline-none font-bold w-full mt-5"
        >
          {isLoading ? "Cargando..." : "ENVIAR"}
        </button>
      </form>
    </Modal>
  );
}
