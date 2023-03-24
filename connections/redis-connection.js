import { createClient } from "redis";
import { REDIS_HOST } from "../utils/config.js";
import logger from "../utils/logger.js";

const RedisClient = createClient({
    url: REDIS_HOST,
});

RedisClient.on("error", (err) => {
    logger.error("Failed to connect to Redis " + err);
});

RedisClient.on("connect", () => {
    logger.info(`Redis connected to ${REDIS_HOST}`);
});

RedisClient.on("disconnect", () => {
    logger.info("Disconnected from Redis");
});

export async function connectRedis() {
    await RedisClient.connect();
}

export default RedisClient;