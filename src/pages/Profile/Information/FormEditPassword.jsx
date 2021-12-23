import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useAuth } from "../../../context/user-auth";
import axios from "axios";

export default function FormEditPassword({ setEditMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const schema = yup.object().shape({
    password: yup.string().trim().required(),
    password_confirmation: yup.string().trim().required(),
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
            password: data.password,
            password_confirmation: data.password_confirmation,
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setEditMode(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Algo salió mal. Inténtalo de nuevo más tarde.");
        throw error;
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-sm">
      <input
        type="password"
        name="password"
        className=" bg-grayFooter py-2 px-3 w-full focus:outline-none border-0 focus:ring-0"
        placeholder="Nueva contraseña"
        ref={register({ required: true })}
      />
      {errors.password && (
        <span className=" text-red text-sm pl-1 mt-2">
          Tiene que escribir una contraseña.
        </span>
      )}
      <input
        type="password"
        name="password_confirmation"
        className=" bg-grayFooter py-2 px-3 w-full focus:outline-none border-0 focus:ring-0 mt-4"
        placeholder="Confirmar contraseña"
        ref={register({ required: true })}
      />
      {errors.password_confirmation && (
        <span className=" text-red text-sm pl-1 mt-2">
          Tiene que escribir de nuevo la contraseña.
        </span>
      )}

      {error && (
        <span className="block text-red text-sm pl-1 mt-4">{error}</span>
      )}

      <div className="mt-4 flex space-x-5">
        <button
          type="cancel"
          onClick={() => setEditMode(false)}
          className=" px-8 py-2 border-2 uppercase focus:outline-none font-bold"
        >
          CANCELAR
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className=" px-8 py-2 bg-yellow focus:outline-none font-bold"
        >
          {isLoading ? "Cargando..." : "GUARDAR"}
        </button>
      </div>
    </form>
  );
}
