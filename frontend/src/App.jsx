import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./Cart";
import AddProduct from "./admin/addProduct";
import NotFoundPage from "./NotFoundPage";
import MyOrders from "./MyOrders";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/myorders" element={<MyOrders />} />

          {/* 404 (Not Found) page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
