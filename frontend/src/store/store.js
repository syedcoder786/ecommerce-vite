import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { productSlice } from "./product/productSlice";
import { cartSlice } from "./cart/cartSlice";
import { orderSlice } from "./order/orderSlice";

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [productSlice.name]: productSlice.reducer,
        [cartSlice.name]: cartSlice.reducer,
        [orderSlice.name]: orderSlice.reducer,
    },
    devTools: true,
});
