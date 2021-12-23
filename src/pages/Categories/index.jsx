import React, { useEffect, useRef, useState } from "react";
import poligon from "../../assets/images/icons/poligon.svg";
import arrowSimple from "../../assets/images/general/arrow-simple.svg";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import axios from "axios";
import { useCategories } from "../../context/categories";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Categories() {
  const [openSelect, setOpenSelect] = useState(false);
  const [openSelect2, setOpenSelect2] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState("");
  const [banner, setBanner] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [order, setOrder] = useState("Novedades");
  const location = useLocation();
  const { categories } = useCategories();
  const wrapperRef = useRef(null);
  let { categoryId, subcategoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
    // eslint-disable-next-line
  }, [location, pageNumber, order]);

  useEffect(() => {
    getFilters();
    // eslint-disable-next-line
  }, [location, categories]);

  const getFilters = async () => {
    const result = await categories?.filter((category) => {
      return category.value === Number(categoryId);
    });

    const category = result?.length > 0 ? result[0] : null;

    if (subcategoryId) {
      const result = await category?.subgroups?.filter((subcategories) => {
        return subcategories.value === Number(subcategoryId);
      });

      const subcategory = result?.length > 0 ? result[0] : null;
      setBanner(subcategory.image_url);
      setFilter(subcategory?.label);
    } else {
      setBanner(category.image_url);
      setFilter("Todos");
    }

    setFilters(category?.subgroups);
    setCategoryName(category?.label);
  };

  const getProducts = () => {
    setIsLoading(true);

    if (subcategoryId) {
      axios
        .get(
          `${
            process.env.REACT_APP_BASE_URL
          }/api/inventory/getStoreArticles?key=${
            process.env.REACT_APP_API_KEY
          }&categoryLevelTwoId=${subcategoryId}&pager=true&page=${pageNumber}&rows=12&sortColumn=${
            order === "precio" ? "a.retail_price" : "is_prioritized"
          }`
        )
        .then((response) => {
          setProducts(response.data.rows);

          let numberofPages = response.data.records / 12;
          let arrayofPage = [];

          for (let i = 0; i < numberofPages; i++) {
            arrayofPage.push(i);
          }

          setNumberOfPages(arrayofPage);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          throw error;
        });
    } else {
      axios
        .get(
          `${
            process.env.REACT_APP_BASE_URL
          }/api/inventory/getStoreArticles?key=${
            process.env.REACT_APP_API_KEY
          }&categoryLevelOneId=${categoryId}&pager=true&page=${pageNumber}&rows=12&sortColumn=${
            order === "precio" ? "a.retail_price" : "is_prioritized"
          }`
        )
        .then((response) => {
          setProducts(response.data.rows);

          let numberofPages = response.data.records / 12;
          let arrayofPage = [];

          for (let i = 0; i < numberofPages; i++) {
            arrayofPage.push(i);
          }

          setNumberOfPages(arrayofPage);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          throw error;
        });
    }
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSelect(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="">
          <h2 className="lg:hidden py-4 text-center font-bold text-xl uppercase">
            {categoryName}
          </h2>
        </div>

        <div className="flex justify-center px-5">
          {banner && (
            <div className="max-w-2xl max-h-72">
              <img src={banner} alt="" className="h-full mx-auto" />
            </div>
          )}
        </div>
      </div>

      <div className="px-5 lg:px-0 pt-10 pb-5 lg:sticky top-20 bg-white z-20">
        <div className="container mx-auto flex justify-between items-center ">
          <h2 className="hidden lg:block">
            <span className="font-black text-xl">{categoryName}</span> /{" "}
            {filter}
          </h2>
          <div className="flex items-center space-x-5">
            <div className="flex lg:items-center flex-col lg:flex-row">
              <label htmlFor="" className=" uppercase font-bold text-sm">
                explorar
              </label>

              <div className="mt-1 inline-block relative lg:ml-3 w-40 lg:w-44 bg-green py-2 cursor-default focus:outline-none focus:ring-0 items-center">
                <div
                  onClick={() => setOpenSelect(true)}
                  ref={wrapperRef}
                  className="relative"
                >
                  <span className="block truncate uppercase font-bold px-3 text-xs">
                    {filter}
                  </span>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-c-white">
                    <img src={poligon} alt="" className="" />
                  </div>

                  {openSelect && (
                    <div className="absolute w-full bg-green z-10 mt-2">
                      <ul
                        onClick={() => setOpenSelect(false)}
                        className="max-h-56 overflow-auto focus:outline-none focus:ring-0 text-xs"
                      >
                        <Link
                          to={`/productos/categorias/${categoryId}`}
                          onClick={() => {
                            setOpenSelect(false);
                            setFilter("Todos");
                          }}
                          className="select-none block relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold hover:bg-greenDark"
                        >
                          Todos
                        </Link>
                        {filters &&
                          filters?.map((filter, index) => (
                            <Link
                              key={index}
                              to={`/productos/categorias/${filter.parent_id}/${filter.value}`}
                              onClick={() => {
                                setOpenSelect(false);
                                setFilter(filter.label);
                              }}
                              className="select-none block relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold hover:bg-greenDark"
                            >
                              {filter.label}
                            </Link>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex lg:items-center flex-col lg:flex-row">
              <label
                htmlFor=""
                className=" uppercase font-bold text-sm lg:ml-10"
              >
                ordenar
              </label>
              <div className="mt-1 inline-block relative lg:ml-3">
                <button
                  onClick={() => setOpenSelect2(true)}
                  className={`relative w-40 bg-white px-4 py-2 cursor-default focus:outline-none focus:ring-0 flex items-center ${
                    openSelect2
                      ? "border-r-2 border-t-2 border-l-2"
                      : "border-2 "
                  }`}
                >
                  <span className="block truncate uppercase font-bold pr-3 text-xs">
                    {order}
                  </span>
                  <img src={poligon} alt="" className="absolute right-0 mr-4" />
                </button>
                {openSelect2 && (
                  <div className="absolute w-full bg-white z-10 border-b-2 border-r-2 border-l-2 text-xs">
                    <ul
                      onClick={() => setOpenSelect2(false)}
                      className="max-h-56 overflow-auto focus:outline-none focus:ring-0"
                    >
                      <li
                        onClick={() => setOrder("precio")}
                        className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold"
                      >
                        precio
                      </li>
                      <li
                        onClick={() => setOrder("novedades")}
                        className="select-none relative py-2 pl-3 pr-9 uppercase cursor-pointer font-bold"
                      >
                        novedades
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {!isLoading ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-5 mt-5 px-5">
              {products &&
                products?.map((value, index) => (
                  <div className="flex justify-center lg:py-8" key={index}>
                    <ProductCard data={value} />
                  </div>
                ))}
            </div>
            {products?.length === 0 && (
              <div className=" text-center text-2xl font-bold">
                No se encontradon productos
              </div>
            )}
            <div className="flex justify-center mt-10 pb-20 space-x-10 lg:space-x-40">
              <div
                onClick={() => {
                  pageNumber > 1 && setPageNumber(pageNumber - 1);
                }}
                className={`flex items-center ${
                  pageNumber > 1 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
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
                {numberOfPages.map((val, index) => (
                  <span
                    onClick={() => setPageNumber(val + 1)}
                    className={` ${
                      val + 1 === pageNumber
                        ? ""
                        : "text-grayText2 cursor-pointer"
                    } `}
                    key={index}
                  >
                    {val + 1}
                  </span>
                ))}
              </div>

              <div
                onClick={() => {
                  pageNumber < numberOfPages.length &&
                    setPageNumber(pageNumber + 1);
                }}
                className={`flex items-center ${
                  pageNumber < numberOfPages.length
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                <span className=" font-bold text-xl text-blackText uppercase hidden lg:inline">
                  Siguiente
                </span>
                <img src={arrowSimple} alt="" className="ml-3 h-3" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-56">
            <Loader />
          </div>
        )}
      </div>

      <NewsLetter />

      <Footer />
    </div>
  );
}
