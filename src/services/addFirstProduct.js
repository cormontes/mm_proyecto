export const getFloatVal = (string) => {
  let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];

  return null !== floatValue
    ? parseFloat(parseFloat(floatValue).toFixed(2))
    : "";
};

export const addFirstProduct = (product) => {
  let productPrice = getFloatVal(product.final_price.toFixed(2));

  // create an empty array and push the item.
  let newCart = {
    products: [],
    totalProductsCount: 1,
    totalProductsPrice: productPrice,
  };

  const newProduct = createNewProduct(product, productPrice, 1);
  newCart.products.push(newProduct);

  localStorage.setItem("mm-cart", JSON.stringify(newCart));

  return newCart;
};

/**
 *Create a new product object.
 *
 * @param product
 * @param productPrice
 * @param qty
 */
export const createNewProduct = (product, productPrice, qty) => {
  return {
    id: product.id,
    name: product.name,
    qty: qty,
    image_url: product.image_url || "",
    price: productPrice,
    totalPrice: parseFloat((productPrice * qty).toFixed(2)),
  };
};
