import { Router } from "express";
import { getCompany, getOTP, getUser, login, register, sendOTP, updatePassword, validateOTP } from "../controller/AuthController.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify/", validateOTP);
router.patch("/update/password", updatePassword)
router.get("/company/:mobile", getCompany);
router.post("/send", sendOTP);
router.post("/user", getUser);
router.get("/user/:userId", getOTP)



export default router;