import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import card from "../../../assets/images/icons/card.svg";
import { useAuth } from "../../../context/user-auth";

export default function ModalDeleteAddress({
  modalDeleteAddress,
  setModalDeleteAddress,
  idToDelete,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useAuth();

  const deleteAddress = (id) => {
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
            id: id,
            is_deleted_by_user: 1, // Si se manda 1, significa que la dirección ha sido eliminada por el usuario
          },
        }
      )
      .then((response) => {
        if (!response.data.error) {
          const actualUser = JSON.parse(localStorage.getItem("mm-user"));
          actualUser.client = response.data.client;
          setUser(actualUser);
          localStorage.setItem("mm-user", JSON.stringify(actualUser));
          setModalDeleteAddress(false);
        } else {
          setError("Algo salió mal. Inténtalo de nuevo más tarde.");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Algo salió mal. Inténtalo de nuevo más tarde.");
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
      isOpen={modalDeleteAddress}
      onRequestClose={() => setModalDeleteAddress(false)}
      style={customStyles}
      contentLabel="Delete Address Modal"
    >
      <div className="w-80 md:w-96 relative bg-white pt-5">
        <h3 className="text-xl text-blackText text-center font-neutra font-bold uppercase relative">
          <img src={card} alt="" className="absolute ml-5" />
          ELIMINAR DIRECCIÓN
        </h3>
        <div className="px-4 mt-5 pb-5">
          <div>
            <p className="mt-5 text-xl text-center font-bold">
              ¿Está seguro de eliminar esta dirección?
            </p>
            <button
              type="submit"
              disabled={isLoading}
              onClick={() => deleteAddress(idToDelete)}
              className=" bg-yellow py-3 flex justify-center items-center relative mt-5 focus:outline-none w-full font-neutra font-bold"
            >
              {isLoading ? "Cargando..." : "ELIMINAR"}
            </button>
            <button
              onClick={() => setModalDeleteAddress(false)}
              type="cancel"
              className=" bg-white py-3 flex justify-center items-center relative mt-4 focus:outline-none w-full font-neutra font-bold border-2"
            >
              CANCELAR
            </button>
          </div>
          {error && <p className="font-semibold text-red mt-3">{error}</p>}
        </div>
      </div>
    </Modal>
  );
}
