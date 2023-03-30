import { Router } from "express";
import {
  getCompany,
  getOTP,
  getUser,
  login,
  register,
  sendOTP,
  updatePassword,
  validateOTP,
} from "../controller/Auth/auth.controller.js";
const router = Router();

// authentication
router.post("/register", register);
router.post("/login", login);
router.patch("/update/password", updatePassword);

// user
router.post("/user", getUser);
router.get("/company/:mobile", getCompany);

// otp
router.post("/send", sendOTP);
router.get("/user/:userId", getOTP);
router.post("/verify/", validateOTP);

export default router;
