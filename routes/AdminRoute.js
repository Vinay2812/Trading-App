import { Router } from "express";
import {
  addUser,
  adminLogin,
  getTenderBalances,
  getQryTrDailyBalance,
  getUsers,
  insertIntoTrDailyPublish,
  mapClient,
  updateAuthorization,
  stopSingleTrade,
  stopAllTrade,
  startSingleTrade,
  updateAllSaleRate,
  updateSingleSaleRate
} from "../controller/AdminController.js";
const router = Router();

router.post("/login", adminLogin);

// registration list
router.get("/users", getUsers);
router.patch("/user/:userId/authorization", updateAuthorization);
router.get("/user/:userId/add", addUser);
router.put("/map", mapClient);

//publish list
router.get("/tenderbalances", getTenderBalances);
router.post("/trDailyPublish", insertIntoTrDailyPublish);

// published-list
router.get("/qrytrdailybalance", getQryTrDailyBalance);
router.patch("/trade/stop", stopSingleTrade);
router.patch("/trade/stop/all", stopAllTrade);
router.patch("/trade/start", startSingleTrade);
router.patch("/sale_rate", updateSingleSaleRate);
router.patch("/sale_rate/all", updateAllSaleRate);

export default router;
