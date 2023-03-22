import { SOCKET_PORT } from "../utils/config.js";
import logger from "../utils/logger.js";
import { createServer } from "http";
import { Server } from "socket.io";

const socket_port = SOCKET_PORT;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*",
});

export function connectSocket() {
  httpServer.listen(socket_port, () =>
    logger.info("Socket listening on port 5500")
  );
}

export default io;
