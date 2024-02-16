import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("cart", JSON.stringify(response.data.cart));
  }

  console.log(response.data);
  return response.data;
};

// Add Address
const addAddress = async (addressData, token) => {
  console.log(addressData);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "addAddress",
    { address: addressData },
    config
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    // localStorage.setItem("cart", JSON.stringify(response.data.cart))
  }

  console.log(response.data);
  return response.data;
};

// Edit Address
const editAddress = async (addressData, token) => {
  console.log(addressData);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "editAddress",
    { address: addressData },
    config
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    // localStorage.setItem("cart", JSON.stringify(response.data.cart))
  }

  console.log(response.data);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("cart", JSON.stringify(response.data.cart));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
};

const authService = {
  register,
  logout,
  login,
  addAddress,
  editAddress,
};

export default authService;
