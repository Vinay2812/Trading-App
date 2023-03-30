import { createServer } from "http";
import { Server } from "socket.io";
import { SOCKET_PORT } from "../utils/config.js";
import logger from "../utils/logger.js";
import io from "../connections/socket.connection.js";

let count = 0;
io.on("connect", (socket) => {
  count++;
  logger.info(`${count} users connected to socket`);
  socket.on("update_client_list", (msg) => {
    logger.info(msg);
    io.emit("refresh_client_list");
  });
  socket.on("user_authorized_by_admin", (msg, accoid, userId) => {
    logger.info(msg);
    io.emit("user_login", userId, accoid, (msg) => {
      logger.info(msg);
    });
  });
  socket.on("disconnect", () => {
    console.clear();
    logger.info(`A user disconnected to socket`);
  });
});
