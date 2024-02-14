import express from "express";
const router = express.Router();
import {
  addProduct,
//   addLike,
  addComment,
  fetchProducts,
  fetchOneProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addProduct);

router.route("/fetchProducts").post(fetchProducts);

router.route("/fetchOneProduct").post(fetchOneProduct)

// router.route("/addLike").product(protect, addLike)

router.route("/addComment").post(protect, addComment)


export default router;
