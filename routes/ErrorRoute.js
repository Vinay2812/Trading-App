import { Router } from "express";
import logger from "../utils/logger/logger.js";
const router = Router();

router.post("/", (req, res)=>{
    const err = req.body;
    console.log(err)
    logger.error(`react - ${JSON.stringify(err)}`);
    res.send("Error appended")
})

export default router;