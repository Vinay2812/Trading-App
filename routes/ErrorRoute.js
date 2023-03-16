import { Router } from "express";
import logger from "../utils/logger/logger.js";
const router = Router();

router.post("/", (req, res)=>{
    const err = req.body;
    logger.error(`react - ${JSON.stringify(err)}`, true);
    res.send("Error appended")
})

export default router;