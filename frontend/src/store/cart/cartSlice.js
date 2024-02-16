import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
// import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // limit: 10,
  // page:0,

  //cart/add
  isAddToCartError: false,
  isAddToCartSuccess: false,
  isAddToCartLoading: false,
  isAddToCartMessage: "",

  //cart/delete
  isDeleteFromCartError: false,
  isDeleteFromCartSuccess: false,
  isDeleteFromCartLoading: false,
  isDeleteFromCartMessage: "",

//   //product/fetch
//   isFetchProductError: false,
//   isFetchProductSuccess: false,
//   isFetchProductLoading: false,
//   isFetchProductMessage: "",
};

// Create new cart
export const addToCart= createAsyncThunk(
  "cart/add",
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.addToCart(cartData, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please Log In to add to cart";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Create new cart
export const deleteFromCart = createAsyncThunk(
  "cart/delete",
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.deleteFromCart(cartData, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please Log In to delete cart";
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


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";

      //cart/add
      state.isAddToCartError = false,
      state.isAddToCartSuccess = false,
      state.isAddToCartLoading = false,
      state.isAddToCartMessage = ""

      //cart/delete
      state.isDeleteFromCartError = false,
      state.isDeleteFromCartSuccess = false,
      state.isDeleteFromCartLoading = false,
      state.isDeleteFromCartMessage = ""

    //   //product/fetch
    //   state.isFetchProductError = false,
    //   state.isFetchProductSuccess = false,
    //   state.isFetchProductLoading = false,
    //   state.isFetchProductMessage = ""
    },

    setCart : (state, action) => {
        // console.log(action.payload)
        state.cartItems = action.payload
    },
    clearCart : (state, action) => {
      localStorage.setItem("cart", JSON.stringify([]))
      state.cartItems = []
    }
  },
  // for backend request
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isAddToCartLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isAddToCartLoading = false;
        state.isAddToCartSuccess = true;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isAddToCartError = true;
        state.isAddToCartMessage = action.payload;
      })


      .addCase(deleteFromCart.pending, (state) => {
        state.isDeleteFromCartLoading = true;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.isDeleteFromCartLoading = false;
        state.isDeleteFromCartSuccess = true;
        state.cartItems = action.payload;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleteFromCartError = true;
        state.isDeleteFromCartMessage = action.payload;
      })
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

export const { reset, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
