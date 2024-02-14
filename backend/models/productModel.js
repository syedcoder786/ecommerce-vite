import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            // required: [true, "User ref is required"],
            ref: "User",
          },
          comment:{
              type:String,
              // required: [true, "Comment is required"],
          },
          time : { type : Date, default: Date.now }
        }
      ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;