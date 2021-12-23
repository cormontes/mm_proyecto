import React from "react";
import modalClose from "../../assets/images/icons/close-modal.svg";
import clock from "../../assets/images/icons/clock.svg";
import Modal from "react-modal";

export default function ModalSchedule({
  storeSelected,
  openModal,
  setOpenModal,
}) {
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
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      style={customStyles}
      contentLabel="Add Card Modal"
    >
      <div className=" w-80 lg:w-96 relative bg-white p-5">
        <img
          onClick={() => setOpenModal(false)}
          src={modalClose}
          alt=""
          className="absolute right-0 h-8 w-8 -mt-8 -mr-4 cursor-pointer"
        />
        <h3 className="text-xl text-blackText text-center font-neutra font-bold uppercase relative py-4 border-b border-grayText2">
          <img src={clock} alt="" className="absolute ml-5 h-6" />
          HORARIOS
        </h3>
        <div className="px-4 mt-5 pb-5">
          <p className=" text-lg text-center font-bold">{storeSelected.name}</p>
          <ul className="space-y-4 flex flex-col items-center mt-6">
            {storeSelected.schedule?.map((value, index) => (
              <li key={index}>
                <p className=" font-bold">{value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
