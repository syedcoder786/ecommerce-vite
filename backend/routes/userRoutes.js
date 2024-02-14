import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
  addAddress,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/addAddress", protect, addAddress);

export default router;
