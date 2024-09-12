import express from "express";
import passport from "passport";

import { UserController } from "../controllers/user.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
  })
);

router.post('/signup',UserController.userSignup)
router.post("/login",UserController.userLogin)
router.post("/forgot-password", UserController.forgotPassword )
router.post("/reset-password", UserController.resetPassword )
router.post("/logout", isAuthenticated , UserController.userLogout )

router.get("/me", isAuthenticated, UserController.myProfile);



// Admin Routes
router.get("/admin/users", isAuthenticated, authorizeAdmin, UserController.getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, UserController.getAdminStats);

export default router;
