import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useSettings } from "./settings";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const { settings } = useSettings();

  useEffect(() => {
    const validateSession = () => {
      const expirationDate = dayjs(localStorage.getItem("expiration-date"));

      const today = dayjs();
      let isAfter = today.isAfter(expirationDate);

      if (isAfter) {
        localStorage.removeItem("expiration-date");
        signout();
      }
    };

    setInterval(() => {
      if (user !== null) {
        validateSession();
      }
    }, 5000);
  }, [user]);

  useEffect(() => {
    if (user === null) {
      setUser(JSON.parse(localStorage.getItem("mm-user")));
    }
  }, [user]);

  const signin = async (data, cb) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/cms/signInUser?key=${process.env.REACT_APP_API_KEY}`,
        body
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.error) {
            return response.data;
          } else {
            const expirationDate = dayjs().add(
              response.data.expiresIn,
              "second"
            );
            localStorage.setItem("expiration-date", expirationDate);
            setUser(response.data);
            localStorage.setItem("mm-user", JSON.stringify(response.data));
            cb();
          }
        }
      })
      .catch((error) => {
        const err = { error: "Algo salió mal. Inténtalo de nuevo más tarde." };
        return err;
      });
  };

  const signout = () => {
    localStorage.removeItem("mm-user");
    localStorage.removeItem("expiration-date");
    setUser(null);
  };

  const signup = async (data, cb) => {
    const body = {
      user: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        password_confirmation: data.password,
        login_type: "D", //D - Decima, F - Facebook, etc.
        is_active: 1, //1->Si, 0->No
      },
      client: {
        single_identity_document_number: "", //DUI
        gender: "", //F -> Mujer, M -> Hombre
        street1: "", // Dirección
        city_name: "", // Municipio
        state_name: "", // Departamento
        country_id: 202, //El Salvador
        phone_number: "",
      },
      settings: settings, //Objeto de configuración obtenido de la "Decima Firebase API"
    };

    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/cms/signUpUser?key=${process.env.REACT_APP_API_KEY}`,
        body
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.error) {
            return response.data;
          } else {
            return axios
              .post(
                `${process.env.REACT_APP_BASE_URL}/api/cms/signInUser?key=${process.env.REACT_APP_API_KEY}`,
                {
                  email: data.email,
                  password: data.password,
                }
              )
              .then((response) => {
                if (response.status === 200) {
                  if (response.data.error) {
                    return response.data;
                  } else {
                    const expirationDate = dayjs().add(
                      response.data.expiresIn,
                      "second"
                    );
                    localStorage.setItem("expiration-date", expirationDate);
                    setUser(response.data);
                    localStorage.setItem(
                      "mm-user",
                      JSON.stringify(response.data)
                    );
                    cb();
                  }
                }
              })
              .catch((error) => {
                const err = {
                  error: "Algo salió mal. Inténtalo de nuevo más tarde.",
                };
                return err;
              });
          }
        }
      })
      .catch((error) => {
        const err = { error: "Algo salió mal. Inténtalo de nuevo más tarde." };
        return err;
      });
  };

  return {
    user,
    setUser,
    signin,
    signout,
    signup,
  };
}
