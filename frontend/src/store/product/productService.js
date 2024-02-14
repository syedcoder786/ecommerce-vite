import axios from "axios";

const API_URL = "http://localhost:5000/api/product/";

// Add To Product
const addProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, productData, config);

  console.log(response.data);

  return response.data;
};

// Fetch Products
const fetchProducts = async () => {

  const response = await axios.post(API_URL+"/fetchProducts");

  // console.log(response.data);

  return response.data;
};

// Fetch Products
const fetchOneProduct = async (dataId) => {


  const response = await axios.post(API_URL+"/fetchOneProduct", dataId);

  console.log(response.data);

  return response.data;
};


// Add Comment to Product
const productComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(commentData)

  const response = await axios.post(API_URL+"addComment", commentData, config);

  console.log(response.data);

  return response.data;
};



const productService = {
  addProduct,
  productComment,
  fetchProducts,
  fetchOneProduct,
};

export default productService;
