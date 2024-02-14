import express from "express";
const router = express.Router();
import {
  createOrder,
  successOrder,
  fetchOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/createOrder").post(createOrder);
router.route("/successOrder").post(protect, successOrder);
router.route("/fetchOrders").post(protect, fetchOrders);

// router.route("/deleteFromCart").post(protect, deleteFromCart);

export default router;