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
  getAllTradeStatus,
} from "../controller/Admin/admin.controller.js";
import {
  addUserReq,
  adminLoginReq,
  mapClientReq,
  modifySingleTradeReq,
  postDailyPublishReq,
  updateAllSaleRateReq,
  updateAllTradeReq,
  updateAuthorizationReq,
  updateSingleSaleRateReq,
  updateSingleTradeReq,
} from "../validators/index.js";
import { ValidateRequest } from "../middlewares/index.js";

const router = Router();

router.post("/login", ValidateRequest(adminLoginReq), adminLogin);

// registration list
router.get("/registration-list/users", getRegistrationListUsers);
router.patch(
  "/registration-list/:userId/authorization",
  ValidateRequest(updateAuthorizationReq),
  updateAuthorization
);
router.post(
  "/registration-list/user/:userId/add",
  ValidateRequest(addUserReq),
  addUser
);
router.put("/registration-list/map", ValidateRequest(mapClientReq), mapClient);

//publish list
router.get("/publish-list/tenderbalances", getTenderBalances);
router.post(
  "/publish-list/dailypublish",
  ValidateRequest(postDailyPublishReq),
  postDailyPublish
);

// published-list
router.get("/published-list/dailybalance", getDailyBalance);
router.patch(
  "/published-list/trade/status",
  ValidateRequest(updateSingleTradeReq),
  updateSingleTrade
);
router.patch(
  "/published-list/trade/status/all",
  ValidateRequest(updateAllTradeReq),
  updateAllTrade
);
router.patch(
  "/published-list/trade/sale_rate",
  ValidateRequest(updateSingleSaleRateReq),
  updateSingleSaleRate
);
router.patch(
  "/published-list/trade/sale_rate/all",
  ValidateRequest(updateAllSaleRateReq),
  updateAllSaleRate
);
router.patch(
  "/published-list/trade/update",
  ValidateRequest(modifySingleTradeReq),
  modifySingleTrade
);
router.get("/published-list/trade/status/all", getAllTradeStatus);

export default router;
