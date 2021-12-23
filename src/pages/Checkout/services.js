import axios from "axios";

export const createOrder = (
  user,
  address,
  card,
  cart,
  shipping_cost,
  discount,
  coupon,
  settings
) => {
  const body = {
    validateStock: true,
    failedPreviousOrderId: null, //Id de pedido previo fallido, se utilizará para cancelar el pedido antes de registrar el nuevo.
    doNotReserveStockWithin: null, //Si el pedido no se entregará en 48 horas, no se va a reservar inventario
    scheduled_delivery_date: "", //Y-m-d Fecha a entregar
    scheduled_delivery_time_range: "10:00 a.m. - 12:00 p.m", //Rango de hora a entregar
    scheduled_delivery_initial_time_range: "", //H:i:s Hora de inicial (formato 24 horas) del rango seleccionado, requerido para calcular la reserva o no de inventario de 48 horas.
    delivery_zone: null, //Zona de delivery: 1, 2, 3, 4, etc,
    document_type: "F", //F - Factura, T - Ticket, C - Comprobante de crédito fiscal
    document_type_label: "Factura",
    payment_form: "T", //E - Efectivo, ...
    payment_form_label: "Tarjeta de crédito",
    status: "A", //A - En proceso
    device: "0", //0 -> web, 1 -> Web responsive,2 -> App IOS,3 -> App Android
    remark: "", //Observaciones
    quantity: cart.totalProductsCount, //total de artículos en pedido
    subtotal: cart.totalProductsPrice,
    shipping_cost: shipping_cost, //Costo de envio
    coupon: coupon, //Código del cupon
    discount: discount, //Monto en $ del descuento
    total_amount_due: Number(
      (cart.totalProductsPrice + shipping_cost - discount).toFixed(2)
    ), //Monto total a pagar (subtotal + shipping_cost - discount)
    cardReference: null, //Enviar aquí el token de la tarjeta en caso que tarjeta guardada por el cliente, ejemplo: 424242_04XOK4242 - Enviar string encriptado,
    creditCard: {
      //Enviar null en caso que sea el 3er intento
      bin: "", //Enviar si se envía cardReference, se guarda junto a la demás data de la tarjeta.
      number: card.number, //Enviar null si se envía cardReference, sino envíar el número ingresado por el client, ejemplo encriptar string: 4242424242424242
      expiryMonth: card.expiry_month, // ejemplo encriptar string: 6
      expiryYear: card.expiry_year, // ejemplo encriptar string: 2022
      cvv: card.cvv, //ejemplo encriptar string: 123
    },
    cardBrand: card.brand,
    gatewayType: "wompi", //Enviar solo si se utilizará una pasarela de pago diferente a la configurada por defecto, se acepta NULL
    gatewayParams: {
      //Enviar parámetros adicionales que necesite la pasarela de pago a utilizar, se acepta NULL
      cardHolderName: card.name,
      email: user.email,
    },
    currency: "USD", //acepta NULL, por defecto es "USD"
    client: {
      id: user.userId,
      name: user.client.name,
      phone_number: "",
      commercial_trade: "",
      single_identity_document_number: "",
      registration_number: "",
      tax_id: "",
      street1: "", //dirección
      city_name: "", //municipio
      state_name: "", //departamento
    },
    clientAddress: {
      address_type: address.address_type, //R - Residencia, E - Empresa
      address: address.address, //dirección
      city_name: address.city_name, //municipio
      firstname: address.firstname,
      geolocation: "", //debe ser string
      id: address.id, //si el es vacío se asociará una nueva dirección de envío al cliente, si tiene valor se le dará update.
      is_deleted_by_user: address.is_deleted_by_user, // Si se manda 1, significa que la dirección ha sido eliminada por el usuario
      lastname: address.lastname,
      reference_point: address.reference_point, //punto de referencia
      state_name: address.state_name, //departamento,
    },
    details: cart.products.map((product) => {
      return {
        quantity: product.qty,
        price: product.price,
        amount: product.totalPrice, //cantidad x precio
        image_url: product.image_url,
        article_id: product.id, // id del artículo
        name: product.name, //Nombre del artículo
      };
    }),
    settings: settings,
  };

  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/api/cms/createOrder?token=${user.idToken}`,
      body
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const applyCoupon = (user, coupon) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/api/sales/validateCoupon?token=${user.idToken}`,
      {
        coupon: coupon,
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
