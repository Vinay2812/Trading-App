import { Router } from "express";
import {
  addUser,
  adminLogin,
  getTenderBalances,
  getDailyBalance,
  getRegistrationListUsers,
  postDailyPublish,
  mapClient,
  updateAuthorization,
  updateAllSaleRate,
  updateSingleSaleRate,
  modifySingleTrade,
  updateSingleTrade,
  updateAllTrade,
} from "../controller/Admin/AdminController.js";
const router = Router();

router.post("/login", adminLogin);

// registration list
router.get("/registration-list/users", getRegistrationListUsers);
router.patch("/registration-list/:userId/authorization", updateAuthorization);
router.post("/registration-list/user/:userId/add", addUser);
router.put("/registration-list/map", mapClient);

//publish list
router.get("/publish-list/tenderbalances", getTenderBalances);
router.post("/publish-list/dailypublish", postDailyPublish);

// published-list
router.get("/published-list/dailybalance", getDailyBalance);
router.patch("/published-list/trade/status", updateSingleTrade);
router.patch("/published-list/trade/status/all", updateAllTrade);
router.patch("/published-list/trade/sale_rate", updateSingleSaleRate);
router.patch("/published-list/trade/sale_rate/all", updateAllSaleRate);
router.patch("/published-list/trade/update", modifySingleTrade);

export default router;
