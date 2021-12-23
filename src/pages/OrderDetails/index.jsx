import React, { useEffect, useState } from "react";
import arrowBack from "../../assets/images/general/arrow-back.svg";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../context/user-auth";
import axios from "axios";
import { Status } from "../Profile/History";

export default function OrderDetails() {
  const { user } = useAuth();
  const [order, setOrder] = useState({});
  const history = useHistory();
  let { orderId } = useParams();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/cms/getClientOrders?token=${user.idToken}&clientId=${user.userId}&id=${orderId}`
      )
      .then((response) => {
        setOrder(response.data.rows[0]);
      })
      .catch((error) => {
        throw error;
      });

    // eslint-disable-next-line
  }, [history]);

  return (
    <div>
      <div className="container mx-auto mt-10 lg:mt-20 lg:px-40 relative">
        <div className="lg:absolute lg:-ml-20 2xl:-ml-32 mb-10 lg:mb-0 ml-5">
          <img
            onClick={() => history.goBack()}
            src={arrowBack}
            alt=""
            className="h-12 cursor-pointer"
          />
        </div>

        <div className="px-5 lg:px-0">
          <h2 className="text-xl text-blackText border-b-2 pb-4 font-bold">
            Detalle de la Orden
          </h2>
          <p className=" font-bold mt-4 text-lg lg:text-base">
            N. Orden: {order.code}
          </p>
          <div className="mt-4 flex flex-col lg:flex-row text-sm">
            <div className="lg:w-1/3 ">
              <div className="flex justify-between items-center">
                <div className="w-36 font-bold">Estado/Tracking:</div>
                <div>
                  {order.status && (
                    <Status
                      status={order.status}
                      status_label={order.status_label}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="w-36 font-bold">Fecha de Compra:</div>
                <div>{order.datetime_es_am_pm}</div>
              </div>
            </div>
            <div className="lg:w-1/3 lg:pl-10 mt-2 lg:mt-0">
              <div className="flex justify-between">
                <div className="w-36 font-bold mr-1">Dirección: </div>
                {order.address && (
                  <div className="w-2/4 lg:w-auto">
                    {`${order.address?.address}, ${order.address?.city_name}, ${order.address?.state_name}`}
                  </div>
                )}
              </div>
            </div>
            <div className="lg:w-1/3 lg:pl-20 mt-2 lg:mt-0">
              <div className="flex justify-between lg:justify-start items-center">
                <div className=" w-28 font-bold">Método Pago:</div>
                <div>{order.payment_form_label}</div>
              </div>
              <div className="items-center mt-2 hidden lg:flex">
                <div className=" w-28 font-bold">Teléfono:</div>
                <div>{order.address?.phone_number}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:border-t border-b border-grayText2">
            <div className="my-2 bg-grayFooter items-center py-2 font-bold hidden lg:flex">
              <div className="w-4/12">Producto</div>
              <div className="w-2/12">Precio</div>
              <div className="w-2/12">Cantidad</div>
              <div className="w-1/12">Total</div>
              <div className="w-3/12"></div>
            </div>
            <div className="my-2 bg-grayFooter flex justify-between items-center py-2 font-bold lg:hidden px-3">
              <div className=" font-bold">{order.quantity} productos</div>
              <div className=" font-bold">
                ${order.total_amount_due?.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            {order.details?.map((data, index) => (
              <div
                className="flex items-center py-5 border-b border-grayText2"
                key={index}
              >
                <div className="w-4/12 flex items-center">
                  <div className="flex-shrink-0 ml-1">
                    <img src={data.image_url} alt="" className="w-20" />
                  </div>
                  <p className=" font-bold ml-1 text-sm pr-5">{data.name}</p>
                </div>
                <div className="w-2/12">${data.price?.toFixed(2)}</div>
                <div className="w-2/12">{data.quantity}</div>
                <div className="w-1/12">${data.amount?.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="lg:hidden">
            {order.details?.map((data, index) => (
              <div className=" py-5 border-b border-grayText2" key={index}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 ml-1">
                    <img src={data.image_url} alt="" className="w-20" />
                  </div>
                  <div>
                    <p className=" uppercase text-blueText">{data.name}</p>
                    <p className=" text-blueText">${data.price?.toFixed(2)}</p>
                    <p className=" text-blueText">{data.quantity}x</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className=" font-bold">
                    Total: ${data.amount?.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-4 pb-20 lg:pb-40">
            <div className="border-2 bg-beige p-5 font-bold space-y-4 inline-block mt-10 w-full lg:w-auto">
              <div className="flex items-center justify-between lg:justify-start">
                <div className=" lg:w-64 text-sm lg:text-base">SUBTOTAL</div>
                <div>${order.subtotal?.toFixed(2)}</div>
              </div>
              <div className="flex items-center justify-between lg:justify-start">
                <div className=" lg:w-64 text-sm lg:text-base">COSTO ENVÍO</div>
                <div>${order.shipping_cost?.toFixed(2)}</div>
              </div>
              {order.coupon && (
                <div className="flex items-center justify-between lg:justify-start">
                  <div className=" lg:w-64 text-sm lg:text-base">
                    CUPÓN {order.coupon}
                  </div>
                  <div>Aplicado</div>
                </div>
              )}
              {order.coupon && (
                <div className="flex items-center justify-between lg:justify-start">
                  <div className=" lg:w-64 text-sm lg:text-base">DESCUENTO</div>
                  <div>${order.discount?.toFixed(2)}</div>
                </div>
              )}
              <div className="flex items-center justify-between lg:justify-start">
                <div className=" lg:w-64 text-sm lg:text-base">TOTAL</div>
                <div>${order.total_amount_due?.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />

      <Footer />
    </div>
  );
}