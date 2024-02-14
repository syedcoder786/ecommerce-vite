import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ref is required"],
        ref: "User",
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product ref is required"],
        ref: "Product",
      }],
    orderDetails : {
        orderCreationId: {
            type: String,
            required: true,
        },
        orderId:{
            type: String,
            required: true,
        },
        paymentId:{
            type: String,
            required: true,
        }
    },
    delivery :{
        isDelivered : {
            type: Boolean,
            default: false
        },
        deliveredOn: {
            type: Date,
            // default: Date.now
        },
    },
    address: {
        name:{
          type:String,
        },
        mobile:{
          type:String,
        },
        pincode:{
          type:String,
        },
        city:{
          type:String,
        },
        state:{
          type:String,
        },
        area:{
          type:String,
        },
      }
    
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;