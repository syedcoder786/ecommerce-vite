import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { clearCart } from "../cart/cartSlice";
// import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  orderItems: null,
  order: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // limit: 10,
  // page:0,

  //   //order/create
  //   isCreateOrderError: false,
  //   isCreateOrderSuccess: false,
  //   isCreateOrderLoading: false,
  //   isCreateOrderMessage: "",

  //order/success
  isSuccessOrderError: false,
  isSuccessOrderSuccess: false,
  isSuccessOrderLoading: false,
  isSuccessOrderMessage: "",

  //order/fetch
  isFetchOrderError: false,
  isFetchOrderSuccess: false,
  isFetchOrderLoading: false,
  isFetchOrderMessage: "",

  //   //product/fetch
  //   isFetchProductError: false,
  //   isFetchProductSuccess: false,
  //   isFetchProductLoading: false,
  //   isFetchProductMessage: "",
};

// // Create order
// export const createOrder= createAsyncThunk(
//   "order/create",
//   async (orderData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await orderService.createOrder(orderData, token);
//     } catch (error) {
//       let message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       if (!thunkAPI.getState().auth.user) {
//         message = "Please Log In to create order";
//       }
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// success order
export const successOrder = createAsyncThunk(
  "order/success",
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.successOrder(orderData, token);
      // thunkAPI.dispatch(clearCart())
      // return res;
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please Log In";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch orders
export const fetchOrders = createAsyncThunk(
  "order/fetch",
  async (_, thunkAPI) => {
    try {
      console.log("test");
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.fetchOrders(token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please Log In";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// // fetch products
// export const fetchProducts = createAsyncThunk("product/fetch", async (_, thunkAPI) => {
//   try {
//     // const token = thunkAPI.getState().auth.user.token;
//     const page = thunkAPI.getState().product.page;
//     const limit = thunkAPI.getState().product.limit;
//     return await productService.fetchProducts();
//   } catch (error) {
//     let message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";

      //   //order/createOrder
      //   state.isCreateOrderError = false,
      //   state.isCreateOrderSuccess = false,
      //   state.isCreateOrderLoading = false,
      //   state.isCreateOrderMessage = ""

      //order/success
      state.isSuccessOrderError = false;
      state.isSuccessOrderSuccess = false;
      state.isSuccessOrderMessage = "";

      //order/fetch
      state.isFetchOrderError = false;
      state.isFetchOrderSuccess = false;
      state.isFetchOrderMessage = "";
    },
  },
  // for backend request
  extraReducers: (builder) => {
    builder

      //   .addCase(createOrder.pending, (state) => {
      //     state.isCreateOrderLoading = true;
      //   })
      //   .addCase(createOrder.fulfilled, (state, action) => {
      //     state.isCreateOrderLoading = false;
      //     state.isCreateOrderSuccess = true;
      //     state.order = action.payload;
      //   })
      //   .addCase(createOrder.rejected, (state, action) => {
      //     state.isCreateOrderLoading = false;
      //     state.isCreateOrderError = true;
      //     state.isCreateOrderMessage = action.payload;
      //   })

      .addCase(successOrder.pending, (state) => {
        state.isSuccessOrderLoading = true;
      })
      .addCase(successOrder.fulfilled, (state, action) => {
        state.isSuccessOrderLoading = false;
        state.isSuccessOrderSuccess = true;
        state.order = action.payload;
      })
      .addCase(successOrder.rejected, (state, action) => {
        state.isSuccessOrderLoading = false;
        state.isSuccessOrderError = true;
        state.isSuccessOrderMessage = action.payload;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.isFetchOrderLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isFetchOrderLoading = false;
        state.isFetchOrderSuccess = true;
        state.orderItems = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isFetchOrderLoading = false;
        state.isFetchOrderError = true;
        state.isFetchOrderMessage = action.payload;
      });
    //   .addCase(fetchProducts.pending, (state) => {
    //     state.isFetchProductLoading = true;
    //   })
    //   .addCase(fetchProducts.fulfilled, (state, action) => {
    //     state.isFetchProductLoading = false;
    //     state.isFetchProductSuccess = true;
    //     state.products = action.payload
    //     // state.products = [...state.products, ...action.payload];
    //     // state.page = state.page + 1;
    //   })
    //   .addCase(fetchProducts.rejected, (state, action) => {
    //     state.isFetchProductLoading = false;
    //     state.isFetchProductError = true;
    //     state.isFetchProductMessage = action.payload;
    //   })
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
