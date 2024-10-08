import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  photo: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: "String",
    enum: ["admin", "user"],
    default: "user",
  },
  phoneNumber:Number,
  password: String,
});

export const User = mongoose.model("User", schema);
