import { useEffect } from "react";
import axios from "axios";
import logo from "./assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { reset, successOrder } from "./store/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./store/cart/cartSlice";

const Razorpay = ({ totalAmount }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // const __DEV__ = document.domain = "localhost"

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const arr = cartItems?.map((item) => item._id);

    console.log(arr);
  }, []);

  const {
    // // orderItems,
    // isCreateOrderLoading,
    // isCreateOrderError,
    // isCreateOrderSuccess,
    // isCreateOrderMessage,

    isSuccessOrderError,
    isSuccessOrderSuccess,
    isSuccessOrderLoading,
    isSuccessOrderMessage,
  } = useSelector((state) => state.order);

  //   useEffect(() => {
  //     if (isCreateOrderError) {
  //       console.log(isCreateOrderMessage);
  //     }

  //     if (isCreateOrderSuccess) {
  //       console.log("success order/create");
  //     }

  //     dispatch(reset());
  //   }, [
  //     isCreateOrderError,
  //     isCreateOrderSuccess,
  //     isCreateOrderMessage,
  //     dispatch,
  //   ]);

  useEffect(() => {
    if (isSuccessOrderError) {
      console.log(isSuccessOrderMessage);
    }

    if (isSuccessOrderSuccess) {
      console.log("success order/success");
      // dispatch(reset());
      dispatch(clearCart());
      navigate("/myorders");
    }

    dispatch(reset());
  }, [
    isSuccessOrderError,
    isSuccessOrderSuccess,
    isSuccessOrderMessage,
    dispatch,
  ]);

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // dispatch(createOrder({ totalAmount }));

    const result = await axios.post(
      "http://localhost:5000/api/order/createOrder",
      {
        totalAmount,
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_O0kB4AvhcsAAYn", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Buy Products",
      description: "Buy Products in ₹ " + amount / 100,
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const orderData = {
          orderCreationId: order_id,
          orderItems: cartItems?.map((item) => item._id),
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          address: user.address,
        };

        dispatch(successOrder(orderData));
        // try {
        //   const result = await axios.post(
        //     "http://localhost:5000/order/success",
        //     data
        //   );
        //   console.log(result.data);
        // } catch (error) {
        //   alert(error);
        //   console.log(error);
        // }
      },
      prefill: {
        name: "Test",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Test Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      <button
        className="my-2 px-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
        onClick={displayRazorpay}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Razorpay;
