import React, { useEffect, useState } from "react";
import BannersSlider from "./Banners";
import Featured from "./Featured";
import NewProductSlider from "./NewProductSlider";
import him from "../../assets/images/homepage/him.jpg";
import her from "../../assets/images/homepage/her.jpg";
import { ReactComponent as ArrowSimple } from "../../assets/images/general/arrow-simple.svg";
import mm from "../../assets/images/general/logo-navbar.svg";
import go from "../../assets/images/brands/go.svg";
import jansport from "../../assets/images/brands/jansport.jpg";
import NewsLetter from "../../components/NewsLetter";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/inventory/getStoreArticles?key=${process.env.REACT_APP_API_KEY}&isFeatured=true&pager=true&page=1&rows=8`
      )
      .then((response) => {
        setProducts(response.data.rows);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div>
      <div className="mt-5">
        <BannersSlider />

        <h2 className=" text-blueText text-2xl text-center mt-8 font-circular font-bold">
          Lo más nuevo
        </h2>

        {products?.length > 4 ? (
          <NewProductSlider products={products} />
        ) : (
          <div className="container mx-auto hidden lg:grid grid-cols-4 px-5 gap-5">
            {products?.map((value, key) => (
              <div key={key} className="pt-4 mx-auto">
                <ProductCard data={value} />
              </div>
            ))}
          </div>
        )}

        <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 px-5 gap-5">
          {products?.map((value, key) => (
            <div key={key} className="pt-4 mx-auto">
              <ProductCard data={value} />
            </div>
          ))}
        </div>

        <Featured />

        <p className=" text-blueText text-2xl text-center mt-20 lg:mt-40 font-circular font-bold">
          ¡Vive cada momento con buen estilo!
        </p>

        <div className="container mx-auto md:grid grid-cols-6 grid-rows-1 lg:h-80 2xl:h-96 px-5 lg:px-40 gap-10 mt-10">
          <Link
            to="/productos/categorias/2"
            className="md:col-span-4 relative cursor-pointer lg:group overflow-hidden block md:inline"
          >
            <div className="bg-black transition-all duration-300 ease-in-out opacity-40 absolute inset-0 group-hover:opacity-60 z-10"></div>
            <img
              src={her}
              alt=""
              className=" h-full w-full object-cover transition-all duration-300 transform scale-100 group-hover:scale-110"
            />
            <p className="xl:text-3xl text-white uppercase absolute bottom-0 flex items-center font-bold mb-5 ml-5 font-neutra z-20">
              Para ellas{" "}
              <ArrowSimple className="ml-3 h-4 fill-current transform group-hover:translate-x-4 transition-all duration-300" />
            </p>
          </Link>

          <Link
            to="/productos/categorias/4"
            className="md:col-span-2 relative cursor-pointer lg:group overflow-hidden mt-5 block md:inline lg:mt-0"
          >
            <div className="bg-black transition-all duration-300 ease-in-out opacity-40 absolute inset-0 group-hover:opacity-60 z-10"></div>
            <img
              src={him}
              alt=""
              className=" h-full w-full object-cover transition-all duration-300 transform scale-100 group-hover:scale-110"
            />
            <p className="xl:text-3xl text-white uppercase absolute bottom-0 flex items-center font-bold mb-5 ml-5 font-neutra z-20">
              Para ellos{" "}
              <ArrowSimple className="ml-3 h-4 fill-current transform group-hover:translate-x-4 transition-all duration-300" />
            </p>
          </Link>
        </div>

        <p className=" text-blueText text-2xl text-center mt-20 font-circular font-bold">
          Las mejores marcas
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center container mx-auto space-y-10 lg:space-y-0 lg:space-x-20 mt-5 mb-20 lg:my-20">
          <img src={mm} alt="" className="h-16" />
          <img src={go} alt="" className="h-20" />
          <img src={jansport} alt="" className="h-16" />
        </div>

        <NewsLetter />

        <Footer />
      </div>
    </div>
  );
}
