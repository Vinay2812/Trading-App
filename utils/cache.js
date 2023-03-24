import RedisClient from "../connections/redis-connection.js";
import logger from "./logger.js";

export async function setCache(key, value, time_in_seconds) {
  try {
    await RedisClient.setEx(key, time_in_seconds, JSON.stringify(value));
  } catch (err) {
    logger.error(err);
  }
}

export async function getCache(key) {
  try {
    let cache = await RedisClient.get(key);
    if(!cache)return null;
    cache = JSON.parse(cache);
    return cache;
  } catch (err) {
    logger.error(err);
    return null;
  }
}

export async function deleteCache(key) {
  try {
    await RedisClient.del(key)
  } catch (err) {
    logger.error(err);
  }
}

