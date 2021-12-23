import React, { useState } from "react";
import { useAuth } from "../../../context/user-auth";
import FormEditEmail from "./FormEditEmail";
import FormEditName from "./FormEditName";
import FormEditPassword from "./FormEditPassword";

export default function Information() {
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const { user } = useAuth();

  return (
    <div className="">
      <h2 className="text-xl text-blackText border-b-2 pb-4 font-bold">
        Información de mi perfil
      </h2>

      <div className="flex font-bold justify-between items-end py-5 border-b border-grayText2">
        {!editName ? (
          <>
            <div className="flex flex-col lg:flex-row">
              <div className="w-32 font-normal">Nombre</div>
              <div className="flex-1">{user.client.name}</div>
            </div>
            <div
              onClick={() => setEditName(true)}
              className=" text-grayText2 cursor-pointer"
            >
              Editar
            </div>
          </>
        ) : (
          <div className="">
            <FormEditName setEditMode={setEditName} />
          </div>
        )}
      </div>
      <div className="flex font-bold justify-between items-end py-5 border-b border-grayText2">
        {!editEmail ? (
          <>
            <div className="flex flex-col lg:flex-row">
              <div className="w-32 font-normal">Correo</div>
              <div className="flex-1">{user.client.email}</div>
            </div>
            <div
              onClick={() => setEditEmail(true)}
              className=" text-grayText2 cursor-pointer"
            >
              Editar
            </div>
          </>
        ) : (
          <div className="">
            <FormEditEmail setEditMode={setEditEmail} />
          </div>
        )}
      </div>
      <div className="flex font-bold justify-between items-end py-5 border-b border-grayText2">
        {!editPassword ? (
          <>
            <div className="flex flex-col lg:flex-row">
              <div className="w-32 font-normal">Contraseña</div>
              <div className="flex-1 text-xs mt-1">●●●●●●●</div>
            </div>
            <div
              onClick={() => setEditPassword(true)}
              className=" text-grayText2 cursor-pointer"
            >
              Editar
            </div>
          </>
        ) : (
          <div className="">
            <FormEditPassword setEditMode={setEditPassword} />
          </div>
        )}
      </div>
    </div>
  );
}
