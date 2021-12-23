import React, { useState } from "react";
import card from "../../../assets/images/icons/card.svg";
import plus from "../../../assets/images/icons/plus.svg";
import { useAuth } from "../../../context/user-auth";
import AES256 from "aes-everywhere";
import ModalAddCard from "./ModalAddCard";
import ModalDeleteCard from "./ModalDeleteCard";

export default function Payment() {
  const [modalAddCard, setModalAddCard] = useState(false);
  const [modalDeleteCard, setModalDeleteCard] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-xl text-blackText border-b-2 pb-4 font-bold hidden lg:block">
        Método de Pago
      </h2>
      <h2 className="text-xl text-blackText border-b-2 pb-4 font-bold lg:hidden">
        Tarjeta débito/crédito
      </h2>

      {user.client?.cards?.length > 0 ? (
        user.client?.cards?.map((values, index) => (
          <>
            <div className="flex items-center justify-between mt-5" key={index}>
              <div className=" font-bold items-center hidden lg:flex">
                <div className=" w-64 flex items-center">
                  Tarjeta débito/crédito
                  <div className="ml-5">
                    <img src={card} alt="" className="h-5" />
                  </div>
                </div>
                <p className=" font-bold uppercase">
                  {values.brand} **** **** ****{" "}
                  {AES256.decrypt(
                    values.number,
                    process.env.REACT_APP_ENCRYPTION_KEY
                  ).slice(-4)}
                </p>
              </div>
              <div className=" font-bold flex items-center lg:hidden">
                <div className="mr-5">
                  <img src={card} alt="" className="h-5" />
                </div>
                <p className=" font-bold uppercase">
                  {values.brand}{" "}
                  {AES256.decrypt(
                    values.number,
                    process.env.REACT_APP_ENCRYPTION_KEY
                  ).slice(-4)}
                </p>
              </div>
              <div
                className=" text-grayText2 cursor-pointer"
                onClick={() => {
                  setIdToDelete(values.id);
                  setModalDeleteCard(true);
                }}
              >
                Eliminar
              </div>
            </div>
            <div className="flex justify-end mt-10"></div>
          </>
        ))
      ) : (
        <div className=" text-center text-xl font-bold mt-16 pb-10">
          Aún no tienes tarjetas guardadas.
        </div>
      )}

      <div className="border-t border-grayText2 mt-5">
        <p className="py-2 text-sm lg:text-base">
          * Solo puedes tener 2 tarjetas máximo en tu cuenta para comprar.
        </p>

        {user.client?.cards?.length < 2 && (
          <button
            onClick={() => setModalAddCard(true)}
            className=" w-full lg:w-auto font-bold flex items-center justify-center lg:bg-black lg:text-white py-3 px-5 mt-5 font-neutra text-sm border-2 lg:border-none"
          >
            <img src={plus} alt="" className="mr-2 h-5 hidden lg:inline" />{" "}
            AGREGAR TARJETA
          </button>
        )}
      </div>

      <ModalAddCard
        modalAddCard={modalAddCard}
        setModalAddCard={setModalAddCard}
      />

      <ModalDeleteCard
        modalDeleteCard={modalDeleteCard}
        setModalDeleteCard={setModalDeleteCard}
        idToDelete={idToDelete}
      />
    </div>
  );
}
