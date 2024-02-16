import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { clearCart, setCart } from "../cart/cartSlice";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

  //login
  isLoginError: false,
  isLoginSuccess: false,
  isLoginLoading: false,
  isLoginMessage: "",

  //register
  isRegisterError: false,
  isRegisterSuccess: false,
  isRegisterLoading: false,
  isRegisterMessage: "",

  //add address
  isAddAddressError: false,
  isAddAddressSuccess: false,
  isAddAddressLoading: false,
  isAddAddressMessage: "",

  // //edit address
  // isEditAddressError: false,
  // isEditAddressSuccess: false,
  // isEditAddressLoading: false,
  // isEditAddressMessage: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const res = await authService.register(user);
      // console.log(res.cart)
      thunkAPI.dispatch(setCart(res.cart));
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add Address
export const addAddress = createAsyncThunk(
  "auth/addAddress",
  async (address, thunkAPI) => {
    try {
      console.log(address);
      const token = thunkAPI.getState().auth.user.token;
      return await authService.addAddress(address, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (!thunkAPI.getState().auth.user) {
        message = "Please LogIn to add address";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// // Edit Address
// export const editAddress = createAsyncThunk(
//   "auth/editAddress",
//   async (address, thunkAPI) => {
//     try {
//       console.log(address);
//       const token = thunkAPI.getState().auth.user.token;
//       return await authService.editAddress(address, token);
//     } catch (error) {
//       let message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       if (!thunkAPI.getState().auth.user) {
//         message = "Please LogIn to edit address";
//       }
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const res = await authService.login(user);
    // console.log(res.cart)
    thunkAPI.dispatch(setCart(res.cart));
    return res;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await authService.logout();
  thunkAPI.dispatch(clearCart());
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";

      // login
      state.isLoginError = false;
      state.isLoginSuccess = false;
      state.isLoginLoading = false;
      state.isLoginMessage = "";

      // register
      state.isRegisterError = false;
      state.isRegisterSuccess = false;
      state.isRegisterLoading = false;
      state.isRegisterMessage = "";

      // add address
      state.isAddAddressError = false;
      state.isAddAddressSuccess = false;
      state.isAddAddressLoading = false;
      state.isAddAddressMessage = "";

      // // edit address
      // state.isEditAddressError = false;
      // state.isEditAddressSuccess = false;
      // state.isEditAddressLoading = false;
      // state.isEditAddressMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(hydrate, (state, action) => {
      //   console.log('HYDRATE', state, action.payload);

      //   return {
      //       ...state,
      //       ...action.payload.auth
      //   };
      // })
      .addCase(register.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.isRegisterSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.isRegisterError = true;
        state.isRegisterMessage = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginSuccess = false;
        state.isLoginError = true;
        state.isLoginMessage = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      .addCase(addAddress.pending, (state) => {
        state.isAddAddressLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isAddAddressLoading = false;
        state.isAddAddressSuccess = true;
        state.user = action.payload;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isAddAddressLoading = false;
        state.isAddAddressError = true;
        state.isAddAddressMessage = action.payload;
        state.user = null;
      });

    // .addCase(editAddress.pending, (state) => {
    //   state.isEditAddressLoading = true;
    // })
    // .addCase(editAddress.fulfilled, (state, action) => {
    //   state.isEditAddressLoading = false;
    //   state.isEditAddressSuccess = true;
    //   state.user = action.payload;
    // })
    // .addCase(editAddress.rejected, (state, action) => {
    //   state.isEditAddressLoading = false;
    //   state.isEditAddressError = true;
    //   state.isEditAddressMessage = action.payload;
    //   state.user = null;
    // });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
