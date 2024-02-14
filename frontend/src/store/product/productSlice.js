import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
// import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  products: [],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // limit: 10,
  // page:0,

  //product/add
  isAddProductError: false,
  isAddProductSuccess: false,
  isAddProductLoading: false,
  isAddProductMessage: "",

  //product/fetch
  isFetchProductError: false,
  isFetchProductSuccess: false,
  isFetchProductLoading: false,
  isFetchProductMessage: "",

  //productOne/fetch
  isFetchOneProductError: false,
  isFetchOneProductSuccess: false,
  isFetchOneProductLoading: false,
  isFetchOneProductMessage: "",
};

// Create new product
export const createProduct= createAsyncThunk(
  "product/add",
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.addProduct(productData, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please LogIn to add product";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// fetch products
export const fetchProducts = createAsyncThunk("product/fetch", async (_, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token;
    // const page = thunkAPI.getState().product.page;
    // const limit = thunkAPI.getState().product.limit;
    return await productService.fetchProducts();
  } catch (error) {
    let message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// fetch products
export const fetchOneProduct = createAsyncThunk("productOne/fetch", async (dataId, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token;
    // const page = thunkAPI.getState().product.page;
    // const limit = thunkAPI.getState().product.limit;
    return await productService.fetchOneProduct(dataId);
  } catch (error) {
    let message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


// Comment product
export const commentProduct= createAsyncThunk(
  "product/comment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log(commentData)
      return await productService.productComment(commentData, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please LogIn to like product";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";

      //product/add
      state.isAddProductError = false,
      state.isAddProductSuccess = false,
      state.isAddProductLoading = false,
      state.isAddProductMessage = ""

      //product/fetch
      state.isFetchProductError = false,
      state.isFetchProductSuccess = false,
      state.isFetchProductLoading = false,
      state.isFetchProductMessage = ""

      //productOne/fetch
      state.isFetchOneProductError = false,
      state.isFetchOneProductSuccess = false,
      state.isFetchOneProductLoading = false,
      state.isFetchOneProductMessage = ""
    },
  },
  // for backend request
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isAddProductLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isAddProductLoading = false;
        state.isAddProductSuccess = true;
        state.products = [action.payload, ...state.products];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isAddProductError = true;
        state.isAddProductMessage = action.payload;
      })
      .addCase(commentProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let tempProducts = state.products
        tempProducts[action.payload.index] = action.payload.data
        // state.posts = [action.payload, ...state.posts];
      })
      .addCase(commentProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isFetchProductLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isFetchProductLoading = false;
        state.isFetchProductSuccess = true;
        state.products = action.payload
        // state.products = [...state.products, ...action.payload];
        // state.page = state.page + 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isFetchProductLoading = false;
        state.isFetchProductError = true;
        state.isFetchProductMessage = action.payload;
      })

      .addCase(fetchOneProduct.pending, (state) => {
        state.isFetchOneProductLoading = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        state.isFetchOneProductLoading = false;
        state.isFetchOneProductSuccess = true;
        state.product = action.payload
        // state.products = [...state.products, ...action.payload];
        // state.page = state.page + 1;
      })
      .addCase(fetchOneProduct.rejected, (state, action) => {
        state.isFetchOneProductLoading = false;
        state.isFetchOneProductError = true;
        state.isFetchOneProductMessage = action.payload;
      })
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
