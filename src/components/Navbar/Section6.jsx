import React from "react";
import { Link } from "react-router-dom";
import sets from "../../assets/images/navbar/sets.jpg";

export default function Section6({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="absolute bg-purple w-full pb-20 inset-x-0 mt-24 self-start"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="container mx-auto mt-10 flex">
            <div className="ml-96">
              <img src={sets} alt="" className="w-72" />
            </div>
            <ul className="ml-24 space-y-5">
              <li>
                <Link
                  to="/productos/categorias/mochilas"
                  className="uppercase text-sm font-bold"
                >
                  dino
                </Link>
              </li>
              <li>
                <Link
                  to="/productos/categorias/mochilas"
                  className="uppercase text-sm font-bold"
                >
                  game
                </Link>
              </li>
              <li>
                <Link
                  to="/productos/categorias/mochilas"
                  className="uppercase text-sm font-bold"
                >
                  unicorn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
