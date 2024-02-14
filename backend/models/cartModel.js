import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ref is required"],
        ref: "User",
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product ref is required"],
        ref: "Product",
      }],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;