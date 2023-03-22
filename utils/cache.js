import { Cache } from "../models/Cache.js";
import { CACHE_REFRESH_INTERVAL } from "./config.js";
import logger from "./logger.js";

export async function setCache(key, value, time_in_seconds) {
  const cache = {
    key,
    value: JSON.stringify(value),
    expiry: Date.now() + time_in_seconds * 1000,
  };
  try {
    await Cache.create(cache);
  } catch (err) {
    logger.error(err);
  }
}

export async function getCache(key) {
  try {
    let cache = await Cache.findOne({
      where: { key },
    });
    cache = JSON.parse(cache);
    return cache;
  } catch (err) {
    logger.error(err);
    return null;
  }
}

export async function deleteCache(key) {
  try {
    await Cache.destroy({
      where: { key },
    });
  } catch (err) {
    logger.error(err);
  }
}

export async function updateCacheDocument() {
  const currTime = Date.now();
  try {
    const deletedCache = await Cache.destroy({
      where: {
        expiry:{
          $lte: currTime
        }
      }
    })
    logger.debug(`Deleted ${deletedCache} cache(s) from cache table`);
    setInterval(() => {
      updateCacheDocument()
    }, CACHE_REFRESH_INTERVAL)
  } catch (err) {
    logger.error(err);
  }
}
