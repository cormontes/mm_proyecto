import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/globals.css";
import "./assets/styles/scrollbar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import { ProvideAuth } from "./context/user-auth";
import { ProvideCategories } from "./context/categories";
import { ProviderCart } from "./context/CartContext";
import { ProvideSettings } from "./context/settings";

ReactDOM.render(
  <React.StrictMode>
    <ProviderCart>
      <ProvideSettings>
        <ProvideCategories>
          <ProvideAuth>
            <App />
          </ProvideAuth>
        </ProvideCategories>
      </ProvideSettings>
    </ProviderCart>
  </React.StrictMode>,
  document.getElementById("root")
);
