import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrowSimple from "../../../assets/images/general/arrow-simple.svg";
import { useAuth } from "../../../context/user-auth";

export default function History() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isChangedPage, setIsChangedPage] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/cms/getClientOrders?token=${user.idToken}&clientId=${user.userId}&pager=true&page=${page}&rows=6`
      )
      .then((response) => {
        setOrders(response.data.rows);
        setPage(response.data.page);
        setTotalPages(response.data.records / 6);
        setIsChangedPage(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });
    // eslint-disable-next-line
  }, [isChangedPage]);

  return (
    <div>
      <h2 className="text-xl text-blackText border-b-2 pb-4 font-bold">
        Historial de Compra
      </h2>

      <div className="font-bold py-5 border-b border-grayText2 mb-2 hidden lg:flex">
        <div className="w-3/12">Fecha/Hora</div>
        <div className="w-2/12">N. Orden</div>
        <div className="w-3/12">Estado/Tracking</div>
        <div className="w-2/12 text-center">Productos</div>
        <div className="w-2/12"></div>
      </div>

      {!isLoading ? (
        <>
          {orders?.length !== 0 ? (
            <>
              <div className="hidden lg:block">
                {orders.map((data, index) => (
                  <div className="flex items-center py-3" key={index}>
                    <div className="w-3/12">{data.datetime_es_am_pm}</div>
                    <div className="w-2/12">{data.code}</div>
                    <div className="w-3/12">
                      <Status
                        status={data.status}
                        status_label={data.status_label}
                      />
                    </div>
                    <div className="w-2/12 text-center">{data.quantity}</div>
                    <div className="w-2/12 flex justify-center">
                      <Link to={`/orderDetails/${data.id}`}>
                        <button className=" border py-2 text-xs px-2">
                          VER DETALLE
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:hidden">
                {orders.map((data, index) => (
                  <div className="py-3" key={index}>
                    <div className="flex justify-between">
                      <p className=" text-grayText font-medium">Fecha/Hora</p>
                      <p className=" text-grayText font-medium">N. Orden</p>
                    </div>
                    <div className="flex justify-between py-2">
                      <p className=" font-medium">{data.datetime_es_am_pm}</p>
                      <p className=" font-medium">{data.code}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>
                        <Status
                          status={data.status}
                          status_label={data.status_label}
                        />
                      </p>
                      <p>Total: ${data.total_amount_due.toFixed(2)}</p>
                    </div>
                    <div className="w-full mt-3">
                      <button className=" border-2 py-2 px-2 w-full font-neutra font-bold">
                        <Link to={`/orderDetails/${data.id}`}>VER DETALLE</Link>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-10 pb-20">
                <div className="w-1/3 flex justify-center">
                  {page > 1 && (
                    <div
                      onClick={() => {
                        setIsChangedPage(true);
                        setPage(page - 1);
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <img
                        src={arrowSimple}
                        alt=""
                        className="mr-3 transform rotate-180 h-3"
                      />
                      <span className=" font-bold text-lg text-blackText uppercase hidden lg:inline">
                        Anterior
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-x-3 text-xl w-1/3 flex justify-center">
                  <span className="">
                    {page}/{Math.ceil(totalPages)}
                  </span>
                </div>

                <div className="w-1/3 flex justify-center">
                  {page < totalPages && (
                    <div
                      onClick={() => {
                        setIsChangedPage(true);
                        setPage(page + 1);
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <span className=" font-bold text-lg text-blackText uppercase hidden lg:inline">
                        Siguiente
                      </span>
                      <img src={arrowSimple} alt="" className="ml-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className=" text-center text-xl font-bold mt-20 pb-10">
              Aún no ha realizado ninguna compra.
            </div>
          )}
        </>
      ) : (
        <div className=" text-center text-xl font-bold mt-20 pb-10">
          Cargando...
        </div>
      )}
    </div>
  );
}

export const Status = ({ status, status_label }) => {
  // A => Comprado C => Cancelado B => En preparación F => Facturado D => Despachado E => Entregado G => Pago rechazado
  if (status === "A" || status === "F" || status === "D" || status === "E") {
    return (
      <>
        <span className="text-greenSuccess">●</span> {status_label}
      </>
    );
  } else if (status === "C" || status === "G") {
    return (
      <>
        <span className="text-red">●</span> {status_label}
      </>
    );
  } else if (status === "B") {
    return (
      <>
        <span className="text-yellow">●</span> {status_label}
      </>
    );
  }
};
