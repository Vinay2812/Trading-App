import mongoose from "mongoose";
import { updateCacheDocument } from "../utils/cache.js";
import {
  CACHE_REFRESH_INTERVAL,
  MONGO_URL_PROD,
  MONGO_URL_TEST,
  NODE_ENV,
} from "../utils/config.js";
import logger from "../utils/logger.js";

export function connectMongodb() {
  mongoose
    .connect(`${NODE_ENV === "production" ? MONGO_URL_PROD : MONGO_URL_TEST}`)
    .then(() => {
      logger.info("mongodb connected");
      setInterval(() => {
        updateCacheDocument().then(
          (res) => res && logger.debug(`Deleted ${res} caches`)
        );
      }, CACHE_REFRESH_INTERVAL);
    })
    .catch((err) => logger.error("failed to connect mongodb " + err));
}
