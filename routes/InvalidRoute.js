import { Router } from "express";
import createError from "http-errors";
const router = Router();
router.all("*", (req, res, next) => {
  try {
    const message = `Invalid route '${
      req.originalUrl
    }' with '${req.method.toUpperCase()}' method`;
    throw createError.NotFound(message);
  } catch (err) {
    next(err);
  }
});
export default router;
