import React, { useState } from "react";
import { ReactComponent as Arrow } from "../../assets/images/general/arrow-simple.svg";
import { Link } from "react-router-dom";

export default function Section5({ open, setOpen, category }) {
  const [subSectionHover, setSubSectionHover] = useState(null);

  return (
    <>
      {open && (
        <div
          className="absolute bg-lightblue w-full pb-20 inset-x-0 mt-24 self-start border-t border-grayText2"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="container mx-auto mt-10 flex">
            <div className=" ml-60">
              <img
                src={
                  subSectionHover
                    ? category?.subgroups[subSectionHover - 1]?.image_url
                    : category?.subgroups[0]?.image_url
                }
                alt=""
                className="w-72"
              />
            </div>
            <ul className="ml-20 space-y-3 w-64">
              {category?.subgroups.map((subcategory, index) => (
                <li className=" w-full border-b border-grayText2" key={index}>
                  <Link
                    to={`/productos/categorias/${subcategory.parent_id}/${subcategory.value}`}
                    className="uppercase text-sm font-bold flex items-center justify-between w-full pb-3"
                    onMouseEnter={() => setSubSectionHover(index + 1)}
                  >
                    {subcategory.label}
                    <Arrow
                      className={`h-4 transition-all duration-200 ease-in-out flex-shrink-0 ml-2 ${
                        subSectionHover === index + 1
                          ? " opacity-100"
                          : " opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
