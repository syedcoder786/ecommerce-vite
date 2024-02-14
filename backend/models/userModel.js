import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    profile_img: {
      type:String,
      // required:true
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

const User = mongoose.model("User", userSchema);

export default User;