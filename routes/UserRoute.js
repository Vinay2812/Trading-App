import { Router } from "express";
import { getAllCompanyName, getUserCompanyDataById, getUserDataFromNt1AccountMaster } from "../controller/UserController.js";
const router = Router();

router.get("/company/:userId", getUserCompanyDataById);
router.get("/company-names", getAllCompanyName);
router.get("/nt_1_account_master/:accoid", getUserDataFromNt1AccountMaster)

export default router