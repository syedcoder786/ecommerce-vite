import express from "express";
const router = express.Router();
import {
  addToCart,
  deleteFromCart
//   fetchCarts,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/addToCart").post(protect, addToCart);

router.route("/deleteFromCart").post(protect, deleteFromCart);

export default router;