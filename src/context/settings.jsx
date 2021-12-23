import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const settingsContext = createContext();

export function ProvideSettings({ children }) {
  const settings = useProvideSettings();
  return (
    <settingsContext.Provider value={settings}>
      {children}
    </settingsContext.Provider>
  );
}

export const useSettings = () => {
  return useContext(settingsContext);
};

function useProvideSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_FIREBASE}/settings.json`)
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return {
    settings,
  };
}
