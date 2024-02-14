import axios from "axios";

const API_URL = "http://localhost:5000/api/order/";

// // Create Order
// const createOrder = async (orderData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   console.log("creating order")

//   const response = await axios.post(API_URL+"createOrder", orderData, config)

//   console.log(response.data);

//   return response.data;
// };


// successOrder
const successOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("success order")
  // console.log(orderData)

  const response = await axios.post(API_URL+"successOrder", orderData, config)
  console.log(response.data);

  return response.data;
};


// fetchOrder
const fetchOrders = async (token) => {
  console.log("fetch order")
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  
  // console.log(orderData)

  const response = await axios.post(API_URL+"fetchOrders", {} ,config)
  console.log(response.data);

  return response.data;
};

// // Fetch Products
// const fetchProducts = async () => {

//   const response = await axios.post(API_URL+"/fetchProducts");

//   // console.log(response.data);

//   return response.data;
// };

const orderService = {
  fetchOrders,
  successOrder
};

export default orderService;
