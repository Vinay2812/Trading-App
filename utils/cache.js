import { Schema, model } from "mongoose";
import logger from "./logger/logger.js";
const CacheSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
  createTime: {
    type: Number,
  },
  expireTime: {
    type: Number,
  },
});

const Cache = model("cache", CacheSchema);

export async function setCache(key, value, time_in_seconds) {
  const cache = {
    key,
    value,
    createTime: Date.now(),
    expireTime: Date.now() + time_in_seconds * 1000,
  };
  try {
    await Cache.updateOne({ key }, JSON.stringify(cache), { upsert: true });
  } catch (err) {
    logger.error(err);
  }
}

export async function getCache(key) {
  try {
    let cache = await Cache.findOne({ key });
    cache = JSON.parse(cache);
    return cache;
  } catch (err) {
    logger.error(err);
    return null;
  }
}

export async function deleteCache(key) {
  try {
    await Cache.deleteOne({ key });
  } catch (err) {
    logger.error(err);
  }
}

export async function updateCacheDocument() {
  const currTime = Date.now();
  try {
    const deletedDocuments = await Cache.deleteMany({
      expireTime: { $lte: currTime },
    });
    return deletedDocuments.deletedCount;
  } catch (err) {
    logger.error(err);
    return 0;
  }
}
