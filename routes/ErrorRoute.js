import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  const err = req.body;
  logger.client(`react - ${JSON.stringify(err)} `);
  res.send("Error appended");
});

export default router;
