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
  startSingleTrade
} from "../controller/AdminController.js";
const router = Router();

router.post("/login", adminLogin);
router.get("/users", getUsers);
router.patch("/user/:userId/authorization", updateAuthorization);
router.get("/user/:userId/add", addUser);
router.put("/map", mapClient);
router.get("/tenderbalances", getTenderBalances);
router.post("/trDailyPublish", insertIntoTrDailyPublish);
router.get("/qrytrdailybalance", getQryTrDailyBalance);
router.patch("/trade/stop", stopSingleTrade);
router.patch("/trade/stop/all", stopAllTrade);
router.patch("/trade/start", startSingleTrade);


export default router;
