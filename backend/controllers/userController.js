import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400);
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return res.json({ message: "Email already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log(user);
  if (user) {
    // new cart created for new user
    let newCart = await Cart.create({
      user: user.id,
    });
    console.log(newCart);
    let cart = await Cart.findById(newCart._id);

    console.log(cart);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      cart: cart.cartItems,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // console.log(email);
  // console.log(password);

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    let cart = await Cart.findOne({ user: user._id }).populate("cartItems");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      token: generateToken(user._id),
      cart: cart.cartItems,
    });
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
    // throw new Error("Invalid credentials");
  }
});

const addAddress = asyncHandler(async (req, res) => {
  const { address } = req.body;

  // console.log(email)
  // console.log(password)

  // Check for user email
  // const user = await User.findOne({ email });

  console.log(address);
  try {
    await User.findOneAndUpdate({ _id: req.user.id }, { address });

    const user = await User.findOne({ _id: req.user.id });

    console.log(user);

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      token: generateToken(user._id),
      address: user.address,
    });
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
});

// const editAddress = asyncHandler(async (req, res) => {
//   const { address } = req.body;

//   // console.log(email)
//   // console.log(password)

//   // Check for user email
//   // const user = await User.findOne({ email });

//   console.log(address)
//   try {
//     await User.findOneAndUpdate(
//       { _id: req.user.id },
//       { address }
//     );

//     const user = await User.findOne({_id: req.user.id})

//     console.log(user)

//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       token: generateToken(user._id),
//       address: user.address,
//     });
//   } catch (error) {
//     res.status(400).json({message:error})
//     console.log(error)
//   }
// });

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    "secretKey"
    // {
    //   expiresIn: "30d",
    // }
  );
};

export { registerUser, loginUser, getMe, addAddress };
