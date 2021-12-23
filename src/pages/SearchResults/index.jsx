import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

export default function SearchResults() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    const value = query.get("search");

    if (value !== "") {
      setSearchValue(value);
      getProducts(value);
    }
    // eslint-disable-next-line
  }, [location]);

  const getProducts = (value) => {
    setIsLoading(true);
    if (value.toUpperCase() === "NOVEDADES") {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/inventory/getStoreArticles?key=${process.env.REACT_APP_API_KEY}&pager=true&page=1&rows=16`
        )
        .then((response) => {
          setProducts(response.data.rows);
          setIsLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } else if (value.toUpperCase() === "OFERTAS") {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/inventory/getStoreArticles?key=${process.env.REACT_APP_API_KEY}&pager=true&page=1&rows=16&hasDiscount=true`
        )
        .then((response) => {
          setProducts(response.data.rows);
          setIsLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } else if (value.toUpperCase() === "DESTACADOS") {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/inventory/getStoreArticles?key=${process.env.REACT_APP_API_KEY}&pager=true&page=1&rows=16&hasDiscount=true`
        )
        .then((response) => {
          setProducts(response.data.rows);
          setIsLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/inventory/getStoreArticles?key=${process.env.REACT_APP_API_KEY}&filter=${value}&pager=true&page=1&rows=12&sortColumn=name`
        )
        .then((response) => {
          setProducts(response.data.rows);
          setIsLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return (
    <div>
      <div className="bg-white w-full pb-5">
        <div className="container mx-auto px-5 lg:px-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchValue.trim() !== "") {
                history.push(`/busqueda?search=${searchValue}`);
              }
            }}
            className="mt-10 flex flex-col lg:flex-row lg:border-b border-grayText2 pb-6"
          >
            <span className="border-b lg:border-none w-full">
              <input
                type="search"
                defaultValue={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full appearance-none lg:text-2xl focus:outline-none lg:pr-10 border-0 focus:ring-0"
                placeholder="Buscar productos o categorías..."
              />
            </span>
            <button
              type="submit"
              className=" text-white bg-black font-bold px-8 py-2 flex items-center justify-center mt-5 lg:mt-0 text-center"
            >
              BUSCAR
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto lg:px-20 px-5 pb-20">
        <p className="">
          Se encontró {products?.length} resultados de{" "}
          <span className="font-bold">"{query.get("search")}"</span>
        </p>

        {!isLoading ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
              {products &&
                products?.map((value, index) => (
                  <div className="flex justify-center py-12" key={index}>
                    <ProductCard data={value} />
                  </div>
                ))}
            </div>
            {products?.length === 0 && (
              <div className=" text-center text-2xl font-bold">
                No se encontradon productos
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-56">
            <Loader />
          </div>
        )}

        {/* <div className="flex justify-between lg:justify-center mt-10 pb-20 lg:space-x-40 px-5 lg:px-0">
          <div className="flex items-center cursor-pointer">
            <img
              src={arrowSimple}
              alt=""
              className="mr-3 transform rotate-180 h-3"
            />
            <span className=" font-bold text-xl text-blackText uppercase hidden lg:inline">
              Anterior
            </span>
          </div>

          <div className="space-x-3 text-xl">
            <span className="">1</span>
            <span className="text-grayText2 cursor-pointer">2</span>
            <span className="text-grayText2 cursor-pointer">3</span>
            <span className="text-grayText2 cursor-pointer">4</span>
          </div>

          <div className="flex items-center cursor-pointer">
            <span className=" font-bold text-xl text-blackText uppercase hidden lg:inline">
              Siguiente
            </span>
            <img src={arrowSimple} alt="" className="ml-3 h-3" />
          </div>
        </div> */}
      </div>

      <NewsLetter />

      <Footer />
    </div>
  );
}
