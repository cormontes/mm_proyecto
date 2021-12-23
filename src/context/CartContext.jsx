import React, { useState, useEffect } from "react";

export const CartContext = React.createContext([{}, () => {}]);

export const ProviderCart = (props) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    let cartData = localStorage.getItem("mm-cart");
    cartData = null !== cartData ? JSON.parse(cartData) : "";
    setCart(cartData);
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
