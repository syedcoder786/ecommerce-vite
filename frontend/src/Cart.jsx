import React, { useEffect } from "react";
import CardCart from "./components/CardCart";
// import { addToCart, reset } from "./store/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Address from "./components/Address";
import Razorpay from "./Razorpay";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    // isAddToCartLoading: isLoading,
    // isAddToCartError: isError,
    // isAddToCartSuccess: isSuccess,
    // isAddToCartMessage: message,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const cartList = cartItems?.map((oneCart, index) => (
    <CardCart {...oneCart} key={index} />
  ));

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">
          Please Log In To Add To Cart.
        </h1>
        {/* <Link to="/">
          <p className="text-xl underline text-yellow-400 font-semibold">
            Shop Now
          </p>
        </Link> */}
      </div>
    );
  }

  if (cartItems?.length == 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Cart Is Empty.</h1>
        <Link to="/">
          <p className="text-xl underline text-yellow-400 font-semibold">
            Shop Now
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl m-2">Cart</h1>
      <hr className="w-11/12 mx-auto" />
      <div className="md:flex gap-4 m-4 justify-center">
        <div className="cards md:w-2/4">
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
          {/* <ul className="py-1 text-lg">
            <li>Item1 X ₹2599</li>
            <li>Item2 X ₹2599</li>
            <li>Item3 X ₹2599</li>
          </ul> */}

          <ol
            style={{ listStyleType: "decimal" }}
            className="px-4 text-lg py-2"
          >
            {cartItems.map((item, index) => (
              <li>
                <span className="font-semibold">₹{item.price}</span> X{" "}
                {item.title}
              </li>
            ))}
          </ol>
          <hr />
          <h1 className="text-xl">
            Total -{" "}
            <span className="font-semibold">
              ₹{cartItems.reduce((acc, obj) => acc + obj.price, 0)}
            </span>
          </h1>
          {/* <br/> */}
          <Razorpay
            totalAmount={
              cartItems.reduce((acc, obj) => acc + obj.price, 0) * 100
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
