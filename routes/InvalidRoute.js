import { Router } from "express";
const router = Router();
router.all("*", (req, res) => {
  const response = {
    message: `Invalid route ${req.url}`,
  };
  logger.log(response);
  res.status(404).json(response);
});
export default router;
