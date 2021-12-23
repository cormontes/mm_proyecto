import React, { useState } from "react";
import Modal from "react-modal";
import card from "../../../assets/images/icons/card.svg";
import { useForm } from "react-hook-form";
import AES256 from "aes-everywhere";
import payment from "payment";
import { useAuth } from "../../../context/user-auth";
import axios from "axios";

export default function ModalAddCard({ modalAddCard, setModalAddCard }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const { user, setUser } = useAuth();

  const onSubmit = (data) => {
    addNewCard(data, user);
  };

  const addNewCard = (data, user) => {
    setIsLoading(true);

    let explodedDate = data.date.split("/");
    let expiryMonth = explodedDate[0];
    let expiryYear = explodedDate[1];
    let cardBrand = payment.fns.cardType(data.number);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/cms/createCreditCard?token=${user.idToken}`,
        {
          name: data.name,
          brand: cardBrand,
          number: AES256.encrypt(
            data.number.replace(/\s/g, ""),
            process.env.REACT_APP_ENCRYPTION_KEY
          ),
          expiry_month: AES256.encrypt(
            expiryMonth,
            process.env.REACT_APP_ENCRYPTION_KEY
          ),
          expiry_year: AES256.encrypt(
            expiryYear,
            process.env.REACT_APP_ENCRYPTION_KEY
          ),
          cvv: AES256.encrypt(data.cvv, process.env.REACT_APP_ENCRYPTION_KEY),
        }
      )
      .then((response) => {
        if (!response.data.error) {
          const actualUser = JSON.parse(localStorage.getItem("mm-user"));
          actualUser.client = response.data.client;
          setUser(actualUser);
          localStorage.setItem("mm-user", JSON.stringify(actualUser));
          setModalAddCard(false);
        } else {
          setError("Algo salió mal. Inténtalo de nuevo más tarde.");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Algo salió mal. Inténtalo de nuevo más tarde.");
        setIsLoading(false);
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
      isOpen={modalAddCard}
      onRequestClose={() => setModalAddCard(false)}
      style={customStyles}
      contentLabel="Add Card Modal"
    >
      <div className="w-80 lg:w-96 relative bg-white pt-5">
        <h3 className=" text-base lg:text-xl text-blackText text-center font-neutra font-bold uppercase relative">
          <img src={card} alt="" className="absolute ml-5" />
          agregar tarjeta
        </h3>
        <div className="px-4 mt-5 pb-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0"
              placeholder="Nombre de tarjeta*"
              name="name"
              ref={register({ required: true })}
            />
            {errors.name && (
              <span className="text-red text-sm pl-1 mt-1">
                Tiene que escribir el nombre de tu tarjeta.
              </span>
            )}
            <input
              type="text"
              className=" bg-grayFooter appearance-none py-2 px-3 w-full focus:outline-none border-0 mt-4"
              placeholder="Numero de tarjeta*"
              name="number"
              ref={register({ required: true })}
            />
            {errors.number && (
              <span className="text-red text-sm pl-1 mt-1">
                Tiene que escribir el número de su tarjeta.
              </span>
            )}
            <div className="flex space-x-5 mt-4">
              <div className="w-1/2">
                <input
                  type="text"
                  className=" bg-grayFooter appearance-none py-2 px-3 focus:outline-none border-0 w-full block"
                  placeholder="Fecha Vto*"
                  name="date"
                  ref={register({ required: true })}
                />
                {errors.date && (
                  <span className="text-red text-sm pl-1 mt-1 block">
                    Tiene que escribir una fecha de vencimiento.
                  </span>
                )}
              </div>
              <div className="w-1/2 ">
                <input
                  type="text"
                  className=" bg-grayFooter appearance-none py-2 px-3 focus:outline-none border-0 w-full block"
                  placeholder="CVV*"
                  name="cvv"
                  ref={register({ required: true })}
                />
                {errors.cvv && (
                  <span className="text-red text-sm pl-1 mt-1 block">
                    Tiene que escribir el cvv de su tarjeta.
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className=" bg-yellow py-3 flex justify-center items-center relative mt-4 focus:outline-none w-full font-neutra font-bold"
            >
              {isLoading ? "Cargando..." : "GUARDAR"}
            </button>
            <button
              onClick={() => setModalAddCard(false)}
              className=" bg-white py-3 flex justify-center items-center relative mt-4 focus:outline-none w-full font-neutra font-bold border-2"
            >
              CANCELAR
            </button>

            {error && <p className=" font-semibold text-red mt-3">{error}</p>}
          </form>
        </div>
      </div>
    </Modal>
  );
}
