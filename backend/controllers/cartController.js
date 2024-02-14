import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";

const addToCart = asyncHandler(async (req, res) => {

    const {
      product_id
    } = req.body
  
    try {
    //   let newProduct = await Product.create({
    //     user: req.user.id,
    //     cart:product_id
    //   });
      console.log(product_id)

      await Cart.findOneAndUpdate(
        { user: req.user.id }, 
        { $addToSet: { cartItems: product_id } }
      );

      const data = await Cart.findOne({ user: req.user.id }).populate("cartItems")
      
      // console.log(data);
  
      res.status(200).json(data.cartItems);
    } catch (e) {
      res.status(400).json({message:e})
      console.log(e);
    }
  
});


const deleteFromCart = asyncHandler(async (req, res) => {

  const {
    product_id
  } = req.body

  try {
  //   let newProduct = await Product.create({
  //     user: req.user.id,
  //     cart:product_id
  //   });
    console.log(product_id)

    const work = await Cart.findOneAndUpdate(
      { user: req.user.id }, 
      { $pull: { cartItems: product_id } }
    );
      
    
    const data = await Cart.findOne({ user: req.user.id }).populate("cartItems")
    
    console.log("test")
    console.log(data);

    res.status(200).json(data.cartItems);
  } catch (e) {
    res.status(400).json({message:e})
    console.log(e);
  }

});

export { addToCart, deleteFromCart };