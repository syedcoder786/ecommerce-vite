import React, { useEffect } from "react";
import CardCart from "./components/CardCart";
// import { addToCart, reset } from "./store/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Address from "./components/Address";
import Razorpay from "./Razorpay";

const Cart = () => {
  const {
    cartItems,
    // isAddToCartLoading: isLoading,
    // isAddToCartError: isError,
    // isAddToCartSuccess: isSuccess,
    // isAddToCartMessage: message,
  } = useSelector((state) => state.cart);

  const cartList = cartItems?.map((oneCart, index) => (
    <CardCart {...oneCart} key={index} />
  ));

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl m-2">Cart</h1>
      <hr className="w-11/12 mx-auto" />
      <div className="md:flex gap-4 m-4 justify-center">
        <div className="cards w-2/4">
          {cartList}
          {/* <CardCart
            title={
              "Title Minus ullam tempore exercitationem vitae cum Minus ullam tempore exercitationem vitae cum"
            }
            price={999}
            _id={"65c1b84cc0b1ae8f16f0503a"}
            inStock={3}
          />
          <CardCart
            title={
              "Title Minus ullam tempore exercitationem vitae cum Minus ullam tempore exercitationem vitae cum"
            }
            price={999}
            _id={"65c1b84cc0b1ae8f16f0503a"}
            inStock={3}
          />
          <CardCart
            title={
              "Title Minus ullam tempore exercitationem vitae cum Minus ullam tempore exercitationem vitae cum"
            }
            price={999}
            _id={"65c1b84cc0b1ae8f16f0503a"}
            inStock={3}
          /> */}
        </div>
        <div className="md:w-1/3 p-2">
          <Address />
          <hr />
          <h1 className="text-2xl pt-1">Check Out</h1>
          <ul className="py-1 text-lg">
            <li>Item1 X ₹2599</li>
            <li>Item2 X ₹2599</li>
            <li>Item3 X ₹2599</li>
          </ul>
          <hr />
          <h1 className="text-xl">
            Total - <span className="font-semibold">₹7999</span>
          </h1>
          {/* <br/> */}
          <Razorpay totalAmount={5000} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
