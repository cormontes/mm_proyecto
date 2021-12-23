import React, { useState } from "react";
import position from "../../../assets/images/icons/position.svg";
import plus from "../../../assets/images/icons/plus.svg";
import ModalAddAddress from "./ModalAddAddress";
import { useAuth } from "../../../context/user-auth";
import ModalEditAddress from "./ModalEditAddress";
import ModalDeleteAddress from "./ModalDeleteAddress";

export default function Address() {
  const [modalAddAddress, setModalAddAddress] = useState(false);
  const [modalEditAddress, setModalEditAddress] = useState(false);
  const [modalDeleteAddress, setModalDeleteAddress] = useState(false);
  const [idToDelete, setToDelete] = useState(null);
  const [addressToEdit, setAddressToEdit] = useState({});
  const { user } = useAuth();

  return (
    <div className="mt-3 lg:mt-0">
      <h2 className="text-xl text-blackText border-b-2 pb-4 font-bold">
        Direcciones guardadas
      </h2>

      {user.client?.addresses.map((values, index) => (
        <div
          key={index}
          className="mt-5 border-b border-grayText2 pb-10 hidden lg:flex"
        >
          <div className="w-1/5 pr-5">
            <p className=" font-bold">Dirección</p>
            <div className="mt-5 flex items-center">
              <img src={position} alt="" className="h-6 mr-3" />
              <p className=" font-bold">{values.name}</p>
            </div>
          </div>
          <div className="w-1/3 pr-5">
            <p className="font-bold leading-tight">
              {values.address}, {values.city_name}, {values.state_name}
            </p>

            <p className="mt-5 font-bold">{`${values.firstname} ${values.lastname}`}</p>
          </div>
          <div className="w-1/4 pl-5 font-bold">{values.reference_point}</div>
          <div className="w-1/4 pl-5 font-bold">{values.phone_number}</div>
          <div className="w-1/4 flex flex-col items-end">
            <div className="text-grayText2 underline">
              <span
                onClick={() => {
                  setModalEditAddress(true);
                  setAddressToEdit(values);
                }}
                className="cursor-pointer"
              >
                Editar
              </span>
              <span
                onClick={() => {
                  setModalDeleteAddress(true);
                  setToDelete(values.id);
                }}
                className="cursor-pointer mt-2 block"
              >
                Eliminar
              </span>
            </div>
          </div>
        </div>
      ))}

      {user.client?.addresses.map((values, index) => (
        <div
          key={index}
          className="mt-5 border-b border-grayText2 pb-10 lg:hidden"
        >
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src={position} alt="" className="h-6 mr-3" />
              <p className=" font-bold">{values.name}</p>
            </div>
            <div className="text-grayText2 cursor-pointer underline">
              <span
                onClick={() => {
                  setModalEditAddress(true);
                  setAddressToEdit(values);
                }}
              >
                Editar
              </span>
              <span
                onClick={() => {
                  setModalDeleteAddress(true);
                  setToDelete(values.id);
                }}
                className="ml-5"
              >
                Eliminar
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <p className=" font-bold">Dirección:</p>

            <p className="font-bold w-2/4 leading-tight">
              {values.address}, {values.city_name}, {values.state_name}
            </p>
          </div>
        </div>
      ))}

      <div className="lg:mt-10 pb-10">
        <button
          onClick={() => setModalAddAddress(true)}
          className=" w-full lg:w-auto flex items-center justify-center lg:bg-black lg:text-white py-3 px-5 mt-5 font-neutra font-bold text-sm border-2 lg:border-none"
        >
          <img src={plus} alt="" className="mr-2 h-5 hidden lg:inline" />{" "}
          AGREGAR DIRECCIÓN
        </button>
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

      <ModalDeleteAddress
        modalDeleteAddress={modalDeleteAddress}
        setModalDeleteAddress={setModalDeleteAddress}
        idToDelete={idToDelete}
      />
    </div>
  );
}
