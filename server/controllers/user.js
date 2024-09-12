import { asyncError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendEmail } from '../utils/email.js'
import otpGenerator from 'otp-generator'

import twilio from 'twilio';
const accountSid = process.env.Account_SID;
const authToken = process.env.Authtoken;
const client = twilio(accountSid, authToken);

export class UserController{
  static myProfile = (req, res, next) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  };
  
  
  
  static getAdminUsers = asyncError(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });

    
  });
  static getAdminStats = asyncError(async (req, res, next) => {
    const usersCount = await User.countDocuments();
  
    const orders = await Order.find({});
  
    const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
    const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
    const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");
  
    let totalIncome = 0;
  
    orders.forEach((i) => {
      totalIncome += i.totalAmount;
    });
  
    res.status(200).json({
      success: true,
      usersCount,
      ordersCount: {
        total: orders.length,
        preparing: preparingOrders.length,
        shipped: shippedOrders.length,
        delivered: deliveredOrders.length,
      },
      totalIncome,
    });
  });
  
  
  
  
  static userSignup = async(req,res)=>{
    const { name, email, password, phoneNumber } = req.body;
    console.log(req.body);
    

    try {
      // check email/user if alredy exists
      
      const userExist = await User.findOne({ email });
    
      
      if(userExist){
        return res.status(400).json({ message:"User already exist" })
      }
      
      const hashPassword = await bcrypt.hash( password, 12 )
      
      const user = new User({ name, email, password : hashPassword, phoneNumber });
      // sending mail to user 
      
      const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false });
      await sendEmail( email, otp )
      // req.session.otp = otp;
      // localStorage.setItem('otp',otp);
      
      
      await user.save()
      res.status(201).json({ message:"User created successfully",otp })
      // else res.status(400).json({ message:"Failed to create user" })
    } 
    catch (error) {
      // return new ErrorHandler( "server error", 500 )
      return res.status(500).json({ message : "server error" })
    }
      
  }
  
  

  
  static userLogin = async(req,res)=>{
    const { email, password }  = req.body;

    
    console.log(req.body);
    try {
      // check user if exists
      const user = await User.findOne({ email });

      
      if(!user) return res.status(404).json({ message:"User not found" });
      // check/compare password 
      const isMatch = await bcrypt.compare( password, user.password );
     
      
      if(!isMatch) return res.status(400).json({ message:"Invalid password" });
      
      const token = jwt.sign( { id: user._id }, "MulukWalia" )
     
      
      // store token in cookie
      // res.cookie('authToken', token, {
      //   httpOnly: true, // Ensures the cookie is inaccessible via JavaScript
      //   secure: true,   // Ensures the cookie is sent only over HTTPS (in production)
      //   sameSite: 'strict', // Prevents CSRF attacks (adjust based on your needs)
      //   maxAge: 60 * 60 * 1000 // 1 hour
      // });

      res.cookie('authToken', token, {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      console.log("---------------------session=====",req.session);
      

      res.status(200).json({ message:"User logged in successfully" })

    }
     catch (error) {
      return res.status(500).json({ message : "server error" })
    }
  
  }

  static userLogout = (req, res, next) => {


    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("authToken", {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
      });

      res.status(200).json({ message: "User logged out successfully" });

    });


    
  };
  static forgotPassword = async(req,res)=>{
    try {
      const { phoneNumber } = req.body;
      const user = await User.findOne({ phoneNumber });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //sms integraton using twilio
      client.verify.v2.services("VA0618ca6070b310899290d4ca7a442508")
            .verifications
            .create({to: '+919518198911', channel: 'sms'})
            .then(verification => console.log(verification.sid));
      
        
      return res.status(200).json({ message:"user find and otp send successfully" })
      

    }
    catch(err){
      return res.status(500).json({ message: "server error" });
    }
  }
  static resetPassword = async (req, res) => {
    try {
      
      const user = await User.findOne({ phoneNumber: req.user.phoneNumber });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
        const pssword = req.body.password
        const hashPassword = await bcrypt.hash( password, 12 )
        user.password = hashPassword
      }
      catch(err){
        return res.status(500).json({ message: "server error" });
      }
    }


}