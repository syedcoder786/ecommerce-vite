import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";


const addProduct = asyncHandler(async (req, res) => {

  // const socket = req.app.get("socket");
  // socket.emit(customerId, { test: "something" });
  const {
    imageUrl,
    title,
    price,
    inStock,
    description,
    category,
  } = req.body

  try {
    let newProduct = await Product.create({
      imageUrl,
      title,
      price,
      inStock,
      description,
      category,
    });

    // console.log(newProduct);

    // await newProduct
    //         .populate("user", { email:0, password: 0 })
    //         .populate("likes.user", { email:0, password: 0 })
    //         .populate("comments.user", { email:0, password: 0 })

    let oneProduct = await Product.findById(newProduct._id)
            // .populate("user", { email:0, password: 0 })
            // .populate("likes.user", { email:0, password: 0 })
            // .populate("comments.user", { email:0, password: 0 })


    // if(newProduct.likes){
    //   await newProduct.likes.map(oneLike => {
    //     oneLike.populate("user")
    //   })
    // }

    // if(newProduct.comments){
    //   await newProduct.comments.map(oneComment => {
    //     oneComment.populate("user")
    //   })
    // }

    console.log(oneProduct);

    // return io.emit("addProduct", oneProduct) // broadcast

    res.status(200).json(oneProduct);
  } catch (e) {
    res.status(400).json({message:e})
    console.log(e);
  }

});


const fetchProducts = asyncHandler(async (req, res) => {
  try {

    // const { page, limit } = req.body
    // const pageno = Number(page)
    // const limitno = Number(limit)

      const productItems = await Product
          .find()
          // .skip(limitno*pageno) //check for Number
          // .limit(limitno) // check for Number
          .sort("-createdAt")
          .populate("comments.user", { email:0, password: 0 })
        

      // console.log(productItems);
      res.status(200).json(productItems);
      
  } catch (error) {
      console.log(error)
      res.status(400).json({message:error})
  }

});


const fetchOneProduct = asyncHandler(async (req, res) => {
  try {

    // const { page, limit } = req.body
    // const pageno = Number(page)
    // const limitno = Number(limit)
      
      const { productId } = req.body
      
      const productOne = await Product
          .findOne({_id: productId})
          // .skip(limitno*pageno) //check for Number
          // .limit(limitno) // check for Number
          .sort("-createdAt")
          .populate("comments.user", { email:0, password: 0 })
        

      // console.log(productOne);
      res.status(200).json(productOne);
      
  } catch (error) {
      console.log(error)
      res.status(400).json({message:error})
  }

});



const addComment = asyncHandler(async (req, res) => {

  try {
    const index = req.body.index

    await Product.findOneAndUpdate(
      { _id: req.body.id }, 
      { $addToSet: { comments: {user: req.user.id, comment: req.body.comment} } }
    );

    const data = await Product.findOne({ _id: req.body.id })
            // .populate("user", { email:0, password: 0 })
            // .populate("likes.user", { email:0, password: 0 })
            .populate("comments.user", { email:0, password: 0 })

      // console.log(data)
    res.status(200).json({data: data, index});
  } catch (e) {
    res.status(400).json({message:e})
    console.log(e);
  }

});

export {
  addProduct,
//   addLike,
  addComment,
  fetchProducts,
  fetchOneProduct,
};
