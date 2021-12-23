import React from "react";
import main from "../../assets/images/about/main.jpg";
import photo from "../../assets/images/about/about1.jpg";
import grid from "../../assets/images/grid.png";
import mm from "../../assets/images/general/logo-navbar.svg";
import go from "../../assets/images/brands/go.svg";
import jansport from "../../assets/images/brands/jansport.jpg";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";

export default function About() {
  return (
    <div>
      <div className="container mx-auto px-5 lg:px-0 mt-5 lg:mt-0">
        <div className="xl:px-32">
          <img src={main} alt="" />
        </div>

        <div className="flex flex-col lg:flex-row mt-10 lg:mt-20">
          <div className="lg:w-5/12 flex justify-center lg:justify-end order-2 lg:order-1 mt-10 lg:mt-0">
            <div className="w-72">
              <img src={photo} alt="" className="" />
            </div>
          </div>

          <div className="lg:w-7/12 container order-1 lg:order-2">
            <h1 className=" text-xl lg:text-2xl font-bold">
              Industrias Mike Mike S.A. de C.V
            </h1>

            <p className="mt-5 font-bold lg:text-xl">
              Ofrecemos soluciones innovadoras a nuestros clientes, para llevar
              sus pertenencias con productos de calidad a costos.
            </p>

            <p className="mt-5 lg:text-lg">
              Fundada en San Salvador en 1965 por Don Miguel Elías Miguel.{" "}
              <br /> Mike Mike es reconocida regionalmente por su alta calidad,
              productos innovadores y adaptación al mercado que cambia
              constantemente. <br /> <br />
              Nuestras marcas principales son Mike Mike y GO. La marca GO fue
              fundada como una sub-marca de Mike Mike en el año 2003 y es ahora
              la marca más reconocida por su calidad e innovación en mochilas y
              otros accesorios para jóvenes en El Salvador.
            </p>
          </div>
        </div>

        <div className="flex justify-around lg:justify-center items-center container mx-auto lg:space-x-20 my-20">
          <img src={mm} alt="" className="h-10 lg:h-16" />
          <img src={go} alt="" className="h-12 lg:h-20" />
          <img src={jansport} alt="" className="h-10 lg:h-16" />
        </div>

        <div className="flex flex-col lg:flex-row mt-20 pb-20">
          <div className="lg:w-5/12 lg:mt-20 flex lg:justify-end">
            <div className="lg:px-5">
              <p className="font-bold text-lg">
                El equipo Mike Mike cuenta con más de 300 colaboradores donde
                cada uno se asegura de mantener la calidad y el mejor servicio
                para que nuestros clientes tengan una excelente experiencia al
                preferirnos.
              </p>
              <div className="mt-10 hidden lg:flex font-bold font-neutra uppercase ">
                <p className=" w-72">Productos de alta calidad</p>
                <p>Excelente servicio</p>
              </div>
              <div className="mt-10 hidden lg:flex font-bold font-neutra uppercase">
                <p className=" w-72">Costos razonables</p>
                <p>Garantía</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-end lg:pl-10 mt-10 lg:mt-0">
            <div className="">
              <img src={grid} alt="" className="" />
            </div>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
}
