import { Router } from "express";
import logger from "../utils/logger.js";
const router = Router();

router.post("/", (req, res) => {
  const err = req.body;
  logger.log("error", err);
  res.send("Error appended");
});

export default router;
