import { createServer } from "http";
import { Server } from "socket.io";
import { SOCKET_PORT } from "../utils/config.js";

const socket_port = SOCKET_PORT;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*",
});

io.on("connect", (socket) => {
  logger.log(`${socket.id} connected to socket`);
  socket.on("update_client_list", (msg) => {
    logger.log(msg);
    io.emit("refresh_client_list");
  });
  socket.on("user_authorized_by_admin", (msg, accoid, userId) => {
    logger.log(msg);
    io.emit("user_login", userId, accoid, (msg) => {
      logger.log(msg);
    });
  });
  socket.on("disconnect", () => {
    logger.log("A user disconnected to socket");
  });
});

httpServer.listen(socket_port, () =>
  logger.log("Socket listening on port 5500")
);
export default io;
