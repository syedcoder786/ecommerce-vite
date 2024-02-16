import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./Cart";
import AddProduct from "./admin/addProduct";
import NotFoundPage from "./NotFoundPage";
import MyOrders from "./MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import EditProfile from "./EditProfile";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

function App() {
  return (
    <>
      <ToastContainer />

      {/* <BrowserRouter> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/editprofile" element={<EditProfile />} />

          {/* 404 (Not Found) page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      {/* </BrowserRouter> */}
      <Footer />
    </>
  );
}

export default App;
