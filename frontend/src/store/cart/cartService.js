import axios from "axios";
import { proxy } from "../../config/default";

const API_URL = `${proxy}/api/cart/`;

// Add To Cart
const addToCart = async (cartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "addToCart", cartData, config);
  localStorage.setItem("cart", JSON.stringify(response.data));
  console.log(response.data);

  return response.data;
};

// Delete From Cart
const deleteFromCart = async (cartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log("working")
  // console.log(cartData)

  const response = await axios.post(
    API_URL + "deleteFromCart",
    cartData,
    config
  );
  localStorage.setItem("cart", JSON.stringify(response.data));
  console.log(response.data);

  return response.data;
};

// // Fetch Products
// const fetchProducts = async () => {

//   const response = await axios.post(API_URL+"/fetchProducts");

//   // console.log(response.data);

//   return response.data;
// };

const cartService = {
  addToCart,
  deleteFromCart,
};

export default cartService;
