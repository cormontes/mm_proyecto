import { createNewProduct, getFloatVal } from "./addFirstProduct";

export const updateCart = (
  existingCart,
  product,
  qtyToBeAdded,
  newQty = false
) => {
  if (!existingCart) {
    return;
  }

  const updatedProducts = getUpdatedProducts(
    existingCart.products,
    product,
    qtyToBeAdded,
    newQty
  );

  const addPrice = (total, item) => {
    total.totalPrice += item.totalPrice;
    total.qty += item.qty;

    return total;
  };

  //Loop through the updated product array and add the totalPrice of each item to get the totalPrice.
  let total = updatedProducts.reduce(addPrice, {
    totalPrice: 0,
    qty: 0,
  });

  const updatedCart = {
    products: updatedProducts,
    totalProductsCount: parseInt(total.qty),
    totalProductsPrice: parseFloat(total.totalPrice),
  };

  localStorage.setItem("mm-cart", JSON.stringify(updatedCart));
  return updatedCart;
};

/**
 * Get updated product array
 * Updated the product if its exist
 * Add the new product to existing cart
 *
 * @param existingProductsInCart
 * @param product
 * @param qtyToBeAdded
 * @param newQty
 */
export const getUpdatedProducts = (
  existingProductsInCart,
  product,
  qtyToBeAdded,
  newQty = false
) => {
  // Check if the product already exits in the cart.
  const productExistsIndex = isProductInCart(
    existingProductsInCart,
    product.id
  );

  //if product exist (index of that product is found in the array ), update the product quantity and totalPrice
  if (-1 < productExistsIndex) {
    let updatedProducts = existingProductsInCart;
    let updatedProduct = updatedProducts[productExistsIndex];

    //If we have the new  qty of the product available, set that else add the qtyToBeAdded
    updatedProduct.qty = newQty
      ? parseInt(newQty)
      : parseInt(updatedProduct.qty + qtyToBeAdded);

    updatedProduct.totalPrice = parseFloat(
      (updatedProduct.price * updatedProduct.qty).toFixed(2)
    );

    return updatedProducts;
  } else {
    //If product not found push the new product to the existing products array.
    let productPrice = getFloatVal(product.final_price.toFixed(2));
    const newProduct = createNewProduct(product, productPrice, qtyToBeAdded);
    existingProductsInCart.push(newProduct);
    return existingProductsInCart;
  }
};

/**
 * return index of the product if it exist
 *
 * @param existingProductsInCart
 * @param id
 */
export const isProductInCart = (existingProductsInCart, id) => {
  const returnItemThatExist = (item, index) => {
    if (id === item.id) {
      return item;
    }
  };
  const newArray = existingProductsInCart.filter(returnItemThatExist);

  return existingProductsInCart.indexOf(newArray[0]);
};

export const removeItemFromCart = (productId) => {
  let existingCart = localStorage.getItem("mm-cart");
  existingCart = JSON.parse(existingCart);

  if (!existingCart) {
    return;
  }

  // If there is only one item in the cart, delete the cart.
  if (1 === existingCart.products.length) {
    localStorage.removeItem("mm-cart");
    return null;
  }

  // Check if the product already exits in the cart.
  const productExitsIndex = isProductInCart(existingCart.products, productId);

  // If product to be removed exits
  if (-1 < productExitsIndex) {
    const productTobeRemoved = existingCart.products[productExitsIndex];
    const qtyToBeRemovedFromTotal = productTobeRemoved.qty;
    const priceToBeDeductedFromTotal = productTobeRemoved.totalPrice;

    // Remove that product from the array and update the total price and total quantity of the cart
    let updatedCart = existingCart;
    updatedCart.products.splice(productExitsIndex, 1);
    updatedCart.totalProductsCount =
      updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
    updatedCart.totalProductsPrice =
      updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;

    localStorage.setItem("mm-cart", JSON.stringify(updatedCart));
    return updatedCart;
  } else {
    return existingCart;
  }
};
