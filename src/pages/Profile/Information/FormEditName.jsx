import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useAuth } from "../../../context/user-auth";
import axios from "axios";

export default function FormEditName({ setEditMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useAuth();

  const schema = yup.object().shape({
    firstname: yup.string().trim().required(),
    lastname: yup.string().trim().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: user.name,
      lastname: user.lastname,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/cms/updateUser?token=${user.idToken}`, {
        user: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
        client: {
          name: `${data.firstname} ${data.lastname}`,
        },
      })
      .then((response) => {
        if (!response.data.error) {
          const actualUser = JSON.parse(localStorage.getItem("mm-user"));
          actualUser.client = response.data.client;
          setUser(actualUser);
          localStorage.setItem("mm-user", JSON.stringify(actualUser));
          setEditMode(false);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-sm">
      <input
        type="text"
        name="firstname"
        className=" bg-grayFooter py-2 px-3 w-full focus:outline-none border-0 focus:ring-0"
        placeholder="Nombre"
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
        className=" bg-grayFooter py-2 px-3 w-full focus:outline-none border-0 focus:ring-0 mt-4"
        placeholder="Apellido"
        ref={register({ required: true })}
      />
      {errors.lastname && (
        <span className=" text-red text-sm pl-1 mt-2">
          Tiene que escribir un apellido.
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
