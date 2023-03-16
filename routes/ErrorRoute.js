import { Router } from "express";
import dump from "../utils/dump.js";
const router = Router();

router.post("/", (req, res)=>{
    const err = req.body;
    dump(`react - ${err}`, true);
    res.send("Error appended")
})

export default router;