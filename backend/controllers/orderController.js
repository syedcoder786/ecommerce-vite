import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

import Razorpay from "razorpay";
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";

const createOrder = asyncHandler(async (req, res) => {
// router.post("/orders", async (req, res) => {
    const { totalAmount } = req.body
    console.log(totalAmount)
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: totalAmount, // amount in smallest currency unit
            currency: "INR",
            receipt: uuidv4(),
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(400).json({message:"Some error occured"});

        console.log(order)

        res.json(order);

    } catch (error) {
        console.log(error)
        res.status(400).json({message:error});
    }
});

const successOrder = asyncHandler(async (req, res) => {
// router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            orderItems,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            address
        } = req.body;

        console.log(orderCreationId)
        console.log(razorpayPaymentId)
        console.log(razorpayOrderId)
        console.log(razorpaySignature)

        console.log(orderItems)

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        console.log(digest)

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        const newOrder = await Order.create({
            user: req.user.id,
            orderItems,
            orderDetails: {
                orderCreationId,
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
            },
            address
        })

        // Clear Cart
        await Cart.findOneAndUpdate({ user: req.user.id }, { cartItems: [] })

        // console.log(newOrder)
        const order = await Order.findOne({_id: newOrder._id}).populate("orderItems")
        console.log(order)
        res.json(order);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
});


const fetchOrders = asyncHandler(async (req, res) => {

    try {
        const orders = 
        await Order.find({ user: req.user.id })
        .populate("orderItems")
        .sort("-createdAt")

        // console.log(orders)

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error})
    }

        
});

export {
    createOrder,
    successOrder,
    fetchOrders
};
  