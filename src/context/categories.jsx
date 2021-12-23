import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const categoriesContext = createContext();

export function ProvideCategories({ children }) {
  const categories = useProvideCategories();
  return (
    <categoriesContext.Provider value={categories}>
      {children}
    </categoriesContext.Provider>
  );
}

export const useCategories = () => {
  return useContext(categoriesContext);
};

function useProvideCategories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_FIREBASE}/settings/categories.json`
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return {
    categories,
  };
}
