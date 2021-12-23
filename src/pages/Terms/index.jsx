import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/images/general/arrow-simple.svg";
import poligon from "../../assets/images/icons/poligon.svg";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";

export default function Terms() {
  const wrapperRef = useRef(null);
  const { pathname } = useLocation();
  const [openSelect2, setOpenSelect2] = useState(false);
  const [selected, setSelected] = useState("TÉRMINOS DE USO");

  useEffect(() => {
    if (pathname === "/terminos/delivery") {
      setSelected("POLÍTICAS DE ENVÍO");
    } else {
      setSelected("TÉRMINOS DE USO");
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSelect2(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div>
      <div className="container mx-auto flex flex-col lg:flex-row mt-10 lg:mt-20 px-5 lg:px-0">
        <div className="flex flex-col lg:hidden">
          <div className="mt-1 inline-block relative lg:ml-3">
            <button
              onClick={() => setOpenSelect2(true)}
              className={`relative w-full bg-white px-4 py-2 cursor-default focus:outline-none focus:ring-0 flex items-center ${
                openSelect2 ? "border-r-2 border-t-2 border-l-2" : "border-2 "
              }`}
            >
              <span className="block truncate uppercase font-bold pr-3">
                {selected}
              </span>
              <img src={poligon} alt="" className="absolute right-0 mr-4" />
            </button>

            {openSelect2 && (
              <div
                ref={wrapperRef}
                className="absolute w-full bg-white z-10 border-2"
              >
                <ul className="max-h-56 overflow-auto focus:outline-none focus:ring-0">
                  <Link
                    to="/terminos"
                    onClick={() => {
                      setSelected("TÉRMINOS DE USO");
                      setOpenSelect2(false);
                    }}
                    className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                  >
                    TÉRMINOS DE USO
                  </Link>
                  <Link
                    to="/terminos/delivery"
                    onClick={() => {
                      setSelected("POLÍTICAS DE ENVÍO");
                      setOpenSelect2(false);
                    }}
                    className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold flex"
                  >
                    POLÍTICAS DE ENVÍO
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-72 hidden lg:block">
          <div className="lg:w-64 bg-white border-2 border-blackText">
            <ul>
              <li>
                <Link
                  to="/terminos"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  TÉRMINOS DE USO
                  {pathname === "/terminos" && (
                    <div className="">
                      <Arrow className="h-4" />
                    </div>
                  )}
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/terminos/delivery"
                  className="py-3 px-2 border-b border-grayText2 flex items-center justify-between font-bold"
                >
                  POLÍTICAS DE ENVÍO
                  {pathname === "/terminos/delivery" && (
                    <div className="">
                      <Arrow className="h-4" />
                    </div>
                  )}
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="flex-1 lg:pl-20 container pb-20 mt-10 lg:mt-0">
          <Switch>
            <Route exact path={`/terminos`}>
              <h1 className="font-bold text-2xl">Terminos y condiciones</h1>

              <p className="mt-5">
                Estimado cliente, hacemos de su conocimiento que los términos y
                condiciones aquí mencionados, se aceptan al momento de navegar
                en nuestra página web o de comprar nuestros productos por
                cualquier canal electrónico, por lo que le invitamos a leerlos
                detenidamente y en caso de cualquier consulta, no dude en
                contactarnos al correo{" "}
                <a href="mailto:info@mikemike.com.sv" className="">
                  info@mikemike.com.sv
                </a>
                .
              </p>

              <h2 className="mt-5 font-semibold">ACEPTACIÓN DE LOS TÉRMINOS</h2>

              <p className="mt-5">
                Al acceder a nuestro sitio web, el cliente reconoce haber leído
                y entendido estos Términos de Uso y está de acuerdo en sujetarse
                a los mismos y cumplir con todas las leyes y reglamentos
                aplicables de la normativa salvadoreña.
              </p>

              <p className="mt-5">
                Además, cuando el cliente utilice la página web, estará sujeto a
                los términos y condiciones aplicables a dicho servicio en
                particular. INDUSTRIAS MIKE MIKE no se responsabiliza de que el
                material en la página web sea apropiado o esté disponible para
                su uso en otros lugares. Las personas que decidan accesar la
                página web desde cualquier lugar fuera de la República de El
                Salvador, lo harán bajo su responsabilidad de sujetarse a las
                leyes locales que sean aplicables. En caso de que el cliente no
                esté de acuerdo con estos términos, deberá abstenerse de
                ingresar a nuestra página web.
              </p>

              <p className="mt-5">
                Cualquier reclamo con relación a nuestra página web y su
                contenido está regulado por las leyes de El Salvador. Estos
                términos y condiciones están sujetos a cambios sin previo aviso
                en cualquier momento, bajo el principio de autonomía de voluntad
                de INDUSTRIAS MIKE MIKE y a partir de la fecha de modificación
                de estos términos y condiciones, todas las operaciones que se
                celebren entre INDUSTRIAS MIKE MIKE y el cliente se regirán por
                el documento modificado.
              </p>

              <h2 className="mt-5 font-semibold">LAS PARTES</h2>

              <p className="mt-5">
                Entre el cliente, sea este una persona natural o jurídica e
                INDUSTRIAS MIKE MIKE, que cuenta con su página web
                (www.mikemike.com.sv), celebran el presente contrato de
                conformidad con los términos y condiciones de uso que forman
                parte integral de este contrato.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE presumirá de buena fe que está contratando
                directamente con el cliente, por lo que INDUSTRIAS MIKE MIKE no
                tendrá ninguna responsabilidad por suplantación personal que
                realice cualquier cliente.
              </p>

              <p className="mt-5">
                Para realizar cualquier compra, el cliente deberá identificarse
                en la página web, debiendo proporcionar datos personales tales
                como nombre, teléfono de contacto y una cuenta de correo
                electrónico. En caso de cualquier inconveniente al momento de
                identificarse, puede contactarse con nuestro personal
                correspondiente al correo electrónico: info@mikemike.com.sv.
              </p>

              <h2 className="mt-5 font-semibold">LAS DISPOSICIONES</h2>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE, S.A. DE C.V. se reserva el derecho de
                agregar, modificar y/o eliminar las condiciones aquí mencionadas
                de forma total o parcial en cualquier momento, sin necesidad de
                previo aviso, actualizando los términos y condiciones de forma
                inmediata en nuestros respectivos canales electrónicos. Las
                condiciones que se agreguen y/o modifiquen también se entenderán
                por aceptadas, desde el momento en que se actualicen los
                Términos y Condiciones, por lo que instamos a que el cliente
                revise los Términos y Condiciones vigentes al momento de visitar
                nuestra página web o comprar cualquiera de nuestros productos.
              </p>

              <p className="mt-5">
                La declaración de nulidad o invalidez de cualquiera de las
                disposiciones o contenido de los presentes Términos y
                Condiciones, no afectará la validez y eficacia de aquellas que
                no se vean afectadas por dicha nulidad o invalidez.
              </p>

              <h2 className="mt-5 font-semibold">PROPIEDAD INTELECTUAL</h2>

              <p className="mt-5">
                Todos los signos distintivos así como los modelos de utilidad
                y/o diseños industriales, utilizados en nuestros medios de
                comunicación son propiedad exclusiva de INDUSTRIAS MIKE MIKE
                S.A. DE C.V. así como todo el material informático, publicitario
                y/o fotográfico. Cualquier uso no autorizado se considerará como
                una violación a los presentes Términos y Condiciones y a la
                legislación aplicable sobre Propiedad Intelectual.
              </p>

              <p className="mt-5">
                Por tanto, queda prohibido todo acto de copia, reproducción,
                modificación, venta o distribución, por cualquier forma o medio,
                sin una autorización previa y por escrito de INDUSTRIAS MIKE
                MIKE S.A. DE C.V. En ningún caso estos Términos y Condiciones
                confieren derechos, licencias y/o autorizaciones para realizar
                los actos anteriormente descritos. Bajo ningún supuesto se puede
                considerar que se permite el uso o se está concediendo una
                licencia, sobre los signos distintivos.
              </p>

              <h2 className="mt-5 font-semibold">
                OFERTA Y ACEPTACIÓN DE LA MISMA
              </h2>

              <p className="mt-5">
                Existe una invitación a ofrecer por parte de INDUSTRIAS MIKE
                MIKE los productos por medio de la página web, por lo que dicho
                contrato de compraventa de productos MIKE se perfecciona cuando
                el cliente presenta la oferta de compra, seleccionando el o los
                productos y pagando por los mismos.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE S.A. DE C.V. se reserva el derecho a
                aceptar o rechazar una oferta de compra, por lo que en ningún
                caso estará obligada a aceptar una oferta de compra. INDUSTRIAS
                MIKE MIKE podrá aceptar la oferta, ya sea total o parcial, de
                inmediato, luego de efectuado el pago, o en un plazo máximo de 3
                días hábiles. Esta aceptación se realizará por medio de correo
                electrónico al correo proporcionado por el cliente.
              </p>

              <p className="mt-5">
                En caso que INDUSTRIAS MIKE MIKE no acepte la oferta, ya sea
                total o parcialmente, procederá con la devolución de la cantidad
                de dinero correspondiente de acuerdo al método de pago que se
                utilizó. Si se pagó por medio de tarjeta de crédito o débito, se
                realizará la gestión con el banco receptor de la transacción
                para poder efectuar una reversión del pago en un plazo de 3 días
                hábiles.
              </p>

              <p className="mt-5">
                Consecuentemente y luego de perfeccionado el contrato de
                compraventa, se procederá con la entrega y transmisión de la
                propiedad del producto. Esta transmisión de la propiedad ocurre
                cuando INDUSTRIAS MIKE MIKE entrega el producto a la empresa
                transportadora para que este sea remitido a la persona
                designada, sea este el cliente o una tercera persona.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE podrá entregar el o los productos empacados
                en bolsas plásticas o en cajas de regalo, de acuerdo a lo
                solicitado por el cliente, siempre y cuando exista
                disponibilidad. En caso que el empaque del producto presente
                daños o rupturas, la persona designada para recibir el producto
                deberá abstenerse de recibir el mismo y deberá dar aviso.
              </p>

              <p className="mt-5">
                Para pagos por medio de tarjeta débito o tarjeta de crédito, la
                orden de devolución se efectuará en treinta (30) días hábiles,
                sin que exista responsabilidad de INDUSTRIAS MIKE MIKE S.A. DE
                C.V. por las demoras que pueda tener la institución financiera
                correspondiente.
              </p>

              <h2 className="mt-5 font-semibold">PRECIO</h2>

              <p className="mt-5">
                El valor total de la compra incluye el valor del producto más
                los impuestos que apliquen. El cargo de servicio por delivery es
                adicional al valor total del producto, y se cobrará dependiendo
                de la zona de cobertura a la que se solicite el envío y el monto
                total de la orden.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE informará el cargo de servicio por delivery
                que tendrán los productos los cuales se generarán dependiendo de
                los costos, rubros y políticas de la empresa transportadora, las
                cuales son independientes autónomas y ajenas a INDUSTRIAS MIKE
                MIKE. Dentro de dicho cargo, se tendrá en cuenta el lugar del
                territorio salvadoreño al cual se deberán enviar los productos.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE mantendrá actualizados los precios que se
                establecen en la página web, por lo que el cliente debe estar
                atento en caso de presentarse algún cambio en los mismos.
              </p>

              <h2 className="mt-5 font-semibold">CONDICIONES DE PAGO</h2>

              <p className="mt-5">
                Las modalidades de pago con los que se cuentan son única y
                exclusivamente por medio de transferencia electrónica o pago con
                tarjetas de débito o crédito VISA o MASTERCARD. INDUSTRIAS MIKE
                MIKE no será responsable por los fallos en las comunicaciones de
                las entidades bancarias o de crédito, así como tampoco de los
                daños causados a los clientes con ocasión de una acción u
                omisión de dichas entidades.
              </p>

              <p className="mt-5">
                Asimismo, el cliente declara que los recursos con los cuales
                efectuará la compra, provienen de actividades lícitas, por lo
                que los fondos no fueron obtenidos por cualquier tipo de
                conducta contraria a la legislación salvadoreña. El cliente
                también declara que la compra la ha efectuado voluntaria y
                personalmente. Por tanto, el cliente exime a INDUSTRIAS MIKE
                MIKE de cualquier responsabilidad por la información errónea,
                falsa, inexacta que el cliente suministre, de tal forma que el
                cliente será el único responsable.
              </p>

              <h2 className="mt-5 font-semibold">CAMBIOS O DEVOLUCIONES</h2>

              <p className="mt-5">
                En caso de cambio o devolución del producto, el cliente debe
                acercarse a cualquier tienda MIKE MIKE para que se proceda con
                el cambio respectivo, debiendo necesariamente presentar el
                ticket o factura correspondiente. Caso contrario que no se
                presente el ticket o factura, no se podrá proceder con el cambio
                o devolución requerido por el Cliente.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE ofrece a los clientes la disponibilidad de
                los colores de cada producto. Estos se exhiben con fotografías
                reales, sin embargo se debe tomar en cuenta que puede existir
                una variación en el color dependiendo del equipo que se utilice
                para visitar nuestros distintos medios de comunicación, por
                tanto, la empresa no se hace responsable de la diferencia del
                color del producto que cada aparato en particular pueda
                reflejar.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE se reserva el derecho a rechazar y/o
                cancelar el pedido sin necesidad de explicar el motivo, lo cual
                deberá ser notificado por el medio de contacto que el cliente
                proporcionó.
              </p>

              <p className="mt-5">
                Para el caso de devolución, el cliente deberá devolver el
                producto a INDUSTRIAS MIKE MIKE S.A. DE C.V. en cualquiera de
                nuestras tiendas, y en las mismas condiciones en que lo recibió
                con todas las etiquetas y accesorios. Los costos de transporte
                en los que se haya incurrido por parte del Cliente, no serán
                devueltos a éste. El término máximo para ejercer la devolución
                será de tres (3) días calendario contados a partir de la entrega
                del producto.
              </p>

              <p className="mt-5">
                Se exceptúan de lo mencionado anteriormente, los casos de bienes
                confeccionados conforme a las especificaciones o personalizados
                a solicitud del cliente.
              </p>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE deberá devolverle en dinero al consumidor
                todas las sumas pagadas sin que proceda a hacer descuentos o
                retenciones por concepto alguno. En todo caso la devolución del
                dinero al consumidor no podrá exceder de treinta (30) días
                calendario desde el momento en que ejerció el derecho.
              </p>

              <h2 className="mt-5 font-semibold">REVERSIÓN DEL PAGO</h2>

              <p className="mt-5">
                Cuando se solicite la reversión del pago por operaciones objeto
                de fraude, no solicitadas, o por no haber recibido el producto,
                o haber recibido el producto defectuoso o equivocado, el Cliente
                deberá presentar la queja oportunamente dentro de los próximos
                tres (3) días hábiles a INDUSTRIAS MIKE MIKE y devolver el
                producto, en caso aplique, y notificar paralelamente al emisor
                del instrumento de pago electrónico utilizado para realizar la
                compra, el cual, en conjunto con los demás participantes del
                proceso de pago, procederán a reversar la transacción al
                cliente.
              </p>

              <h2 className="mt-5 font-semibold">ENVÍO DE LOS PRODUCTOS</h2>

              <p className="mt-5">
                El envío de los productos se limita al territorio salvadoreño, a
                través de varias empresas que se dedican a la entrega de
                paquetería especializada. El envío se hace en un plazo máximo de
                dos (2) días hábiles cuando sean entregas dentro del área
                metropolitana, y en un plazo de tres (3) a cinco (5) días
                hábiles cuando sean entregas fuera del área metropolitana, ambos
                plazos contados a partir de la realización del pago respectivo y
                posterior confirmación por parte de INDUSTRIAS MIKE MIKE,
                siempre y cuando no medie ningún caso fortuito o fuerza mayor,
                entre los cuales se encuentra a manera de ejemplo, hechos del
                hombre o de la naturaleza, como huelgas, paros, revoluciones,
                rebelión, alteraciones en orden público, atentados, cortes de
                fluidos, situaciones donde estuviere en riesgo la salud,
                derrumbes, terremotos, avalanchas, desbordamientos, caídas de
                puentes, entre otros.
              </p>

              <p className="mt-5">
                El lugar de envío será a la dirección brindada por el cliente,
                el cual podrá ser el mismo lugar de habitación del comprador u
                otro que este designe. Se entiende que cualquier persona que se
                encuentre en la dirección donde se debe realizar la entrega, se
                encuentra debidamente autorizado por el cliente para recibir su
                pedido, por lo que INDUSTRIAS MIKE MIKE queda exonerado de
                cualquier responsabilidad al momento de la entrega, siempre y
                cuando la misma se haga en la dirección brindada por el cliente.
              </p>

              <p className="mt-5">
                En caso que la empresa transportadora no logre entregar el
                producto por la razón que fuere, incluyendo pero no limitado a
                si no hay persona capaz que pueda recibir el producto, se
                procederá a contactar al cliente. En caso que el intento de
                entrega fracase, retornarán el producto a la empresa y se
                contactará al cliente para programar una nueva entrega, debiendo
                el cliente asumir el costo del nuevo envío.
              </p>

              <p className="mt-5">
                Cuando se entregue el producto, también se entregará el ticket o
                la factura en físico, según lo haya requerido el cliente.
              </p>

              <h2 className="mt-5 font-semibold">GARANTÍAS DE PRODUCTOS</h2>

              <p className="mt-5">
                La empresa se hace responsable de reparar fallas de materiales o
                de fabricación, bajo uso en condiciones normales. El período de
                validez de esta garantía es de 3 meses después de la fecha de
                compra. La empresa no se hace responsable por daños ocasionados
                por mal manejo, alta exposición al calor, manchas o contacto con
                disolventes. El cliente está sujeto a cubrir los costos de
                reparación por artículos fuera de garantía.
              </p>

              <p className="mt-5">
                Si desea la devolución o cambio de artículos por compra en
                nuestro sitio web, habrá un máximo de 7 días para hacer la
                gestión desde el día que realizó la compra. Los artículos que se
                devuelven o cambian deben estar en perfectas condiciones y sin
                señales de uso, con todas las viñetas y accesorios originales.
              </p>

              <p className="mt-5">
                Los artículos de reclamo se recibirán en persona solamente en
                sucursales de Mike Mike, el enlace {" "}
                <Link to="/contactenos">
                  www.mikemike.com.sv/contactenos/
                </Link>{" "}
                te llevará donde puedes encontrar la sucursal Mike Mike más
                cercana a ti.
              </p>

              <p className="mt-5">
                ES INDISPENSABLE PRESENTAR IMPRESO O EN DIGITAL EL CORREO DE
                CONFIRMACIÓN DE COMPRA COMO COMPROBANTE Y UN DOCUMENTO DE
                IDENTIDAD.
              </p>

              <p className="mt-5">
                Cualquier duda puedes contactarnos al Tel. 2271-8999 o a nuestro
                WhatsApp: 7877-4049 en horarios hábiles de lunes a viernes de
                8:00 am – 4:00 pm.
              </p>

              <p className="mt-5">
                Para hacer efectiva la garantía aplicable a cualquiera de
                nuestros productos, el cliente deberá acercarse a cualquiera de
                nuestras sucursales MIKE MIKE, con el producto para notificar
                del daño del producto y seguir el procedimiento que a la fecha
                se tenga para la solicitud de las garantías, presentando
                necesariamente su ticket o factura de compra. Será en nuestra
                sucursal donde se le indicará si es procedente la garantía y la
                forma en que ella se realizará.
              </p>

              <p className="mt-5">
                El cliente acepta y declara que INDUSTRIAS MIKE MIKE no tendrá
                ningún tipo de responsabilidad por el transporte del producto
                que remita.
              </p>

              <h2 className="mt-5 font-semibold">COMENTARIOS</h2>

              <p className="mt-5">
                INDUSTRIAS MIKE MIKE S.A. DE C.V. se reserva el derecho de
                publicar o no cualquiera de los comentarios efectuados por los
                usuarios en nuestras redes sociales. Por tanto, INDUSTRIAS MIKE
                MIKE puede retirar un comentario y en su caso, ejercitar las
                acciones que en derecho corresponda. Se deberá velar que todos
                los comentarios que se publiquen en nuestras redes sociales por
                parte de los usuarios, sean efectuados de forma respetuosa,
                evitando comentarios denigrantes u ofensivos.
              </p>

              <h2 className="mt-5 font-semibold">RESPONSABILIDAD LIMITADA</h2>

              <p className="mt-5">
                Bajo ninguna circunstancia, incluyendo, sin limitación,
                negligencia, INDUSTRIAS MIKE MIKE será responsables por daños
                directos, indirectos, incidentales, especiales o consecuentes
                que resulten del uso de, o la incapacidad de usar nuestro sitio
                web o nuestros canales en las distintas redes sociales, incluso
                aunque INDUSTRIAS MIKE MIKE ha sido advertido de la posibilidad
                de tales daños, sin perjuicio de lo determinado en la
                legislación salvadoreña aplicable.
              </p>

              <p className="mt-5">
                En ningún caso la responsabilidad total hacia el cliente por
                todos los daños, pérdidas y causas de acción ya sea en contrato
                o agravio (incluyendo, sin limitación, negligencia, o cualquier
                otra forma) exceder la cantidad pagada por el cliente, en su
                caso, de ingreso en el sitio web de INDUSTRIAS MIKE MIKE.
              </p>

              <p className="mt-5">
                El usuario reconoce y acepta que el uso del sitio web se realiza
                en todo momento bajo su entero riesgo y responsabilidad, por lo
                que INDUSTRIAS MIKE MIKE no se responsabiliza del mal uso, o uso
                indebido que pueda realizarse de dicho sitio. INDUSTRIAS MIKE
                MIKE se reserva unilateralmente la facultad de, en cualquier
                momento, decidir sobre la continuidad de los servicios que
                presta a través de su sitio web. INDUSTRIAS MIKE MIKE se reserva
                unilateralmente el derecho a prohibir o utilizar en cualquier
                momento el enlace al sitio web especialmente en los supuestos de
                ilicitud de la actividad o contenidos de la página o sitio en el
                que se incluye el mismo.
              </p>
            </Route>

            {/* <Route exact path={`/terminos/delivery`}>
              <h2 className="font-bold text-2xl">Politicas de envio </h2>

              <p className="mt-5">
                Unless otherwise indicated, the Site is our proprietary property
                and all source code, databases, functionality, software, website
                designs, audio, video, text, photographs, and graphics on the
                Site (collectively, the “Content”) and the trademarks, service
                marks, and logos contained therein (the “Marks”) are owned or
                controlled by us or licensed to us, and are protected by
                copyright and trademark laws and various other intellectual
                property rights and unfair competition laws of the United
                States, foreign jurisdictions, and international conventions.
              </p>
            </Route> */}
          </Switch>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
}
