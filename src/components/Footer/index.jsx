import React from "react";
import { Link } from "react-router-dom";
import brand from "../../assets/images/general/logo-footer.png";
import fb from "../../assets/images/icons/facebook.svg";
import ig from "../../assets/images/icons/ig.svg";
import wa from "../../assets/images/icons/wa.svg";
import { useCategories } from "../../context/categories";

export default function Footer() {
  const { categories } = useCategories();

  return (
    <div className="bg-grayFooter">
      <div className="container mx-auto flex flex-col lg:flex-row pt-10 lg:pt-20 pb-10">
        <div className="lg:w-1/5 flex lg:block justify-center">
          <img src={brand} alt="" className=" h-16 lg:h-16" />
        </div>
        <div className="px-5 pt-10 lg:pt-0 lg:px-0 lg:w-1/5">
          <p className=" text-blackText text-xl font-bold">Tienda</p>
          <ul className="text-blackText mt-3 lg:mt-5 space-y-2 font-neutra">
            <li>
              <Link
                to={`/productos/categorias/${
                  categories && categories[0].value
                }`}
                className=" uppercase text-xs font-bold"
              >
                {categories && categories[0].label}
              </Link>
            </li>
            <li>
              <Link
                to={`/productos/categorias/${
                  categories && categories[1].value
                }`}
                className=" uppercase text-xs font-bold"
              >
                {categories && categories[1].label}
              </Link>
            </li>
            <li>
              <Link
                to={`/productos/categorias/${
                  categories && categories[2].value
                }`}
                className=" uppercase text-xs font-bold"
              >
                {categories && categories[2].label}
              </Link>
            </li>
            <li>
              <Link
                to={`/productos/categorias/${
                  categories && categories[3].value
                }`}
                className=" uppercase text-xs font-bold"
              >
                {categories && categories[3].label}
              </Link>
            </li>
            <li>
              <Link
                to={`/productos/categorias/${
                  categories && categories[4].value
                }`}
                className=" uppercase text-xs font-bold"
              >
                {categories && categories[4].label}
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-5 pt-10 lg:pt-0 lg:px-0 lg:w-1/5">
          <p className=" text-blackText text-xl font-bold">Productos</p>
          <ul className="text-blackText mt-3 lg:mt-5 space-y-2 font-neutra">
            <li>
              <Link to="/busqueda?search=ofertas" className=" uppercase text-xs font-bold">
                ofertas
              </Link>
            </li>
            <li>
              <Link to="/busqueda?search=novedades" className=" uppercase text-xs font-bold">
                novedades
              </Link>
            </li>
            <li>
              <Link to="/busqueda?search=destacados" className=" uppercase text-xs font-bold">
                los más destacados
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-5 pt-10 lg:pt-0 lg:px-0 lg:w-1/5">
          <p className=" text-blackText text-xl font-bold">Explorar</p>
          <ul className="text-blackText mt-3 lg:mt-5 space-y-2 font-neutra">
            <li>
              <Link
                to="/sobre-nosotros"
                className=" uppercase text-xs font-bold"
              >
                nuestra historia
              </Link>
            </li>
            <li>
              <Link
                to="/contactenos/sansalvador"
                className=" uppercase text-xs font-bold"
              >
                contacte con nosotros
              </Link>
            </li>
            <li className="lg:hidden">
              <Link to="/terminos" className=" uppercase text-xs font-bold">
                TÉRMINOS Y CONDICIONES
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-5 pt-10 lg:pt-0 lg:px-0 lg:w-1/5">
          <p className=" text-blackText text-sm">mikesa@mikemike.com.sv</p>
          <p className=" text-blackText mt-5 text-sm">(503) 2271-8999</p>
          <p className=" text-blackText mt-5 text-sm">
            Industrias Mike Mike S.A. de C.V. <br />
            NIT: 0614-100965-001-6
          </p>
          <div className="flex mt-8 space-x-10">
            <a
              href="https://www.facebook.com/mikemikesv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="" className="h-5 cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/mikemikesv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ig} alt="" className="h-5 cursor-pointer" />
            </a>
            <a
              href="https://www.wppredirect.tk/go/?p=50378774049&m="
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={wa} alt="" className="h-5 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      <div className="h-14 border-t border-grayText2">
        <div className="container mx-auto h-full flex items-center justify-center lg:justify-between ">
          <p className="text-grayText text-sm">
            © Mike Mike 2021. Todos los derechos reservados.
          </p>
          <p className=" text-blackText uppercase font-bold text-sm font-neutra hidden lg:block">
            <Link to="/terminos">TÉRMINOS Y CONDICIONES</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
