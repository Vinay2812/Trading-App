import { SOCKET_PORT, SERVER_HOST } from "../utils/config.js";
import logger from "../utils/logger.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*",
});

export function connectSocket() {
  httpServer.listen(SOCKET_PORT, () =>
    logger.info(`Socket listening on ${SERVER_HOST}:${SOCKET_PORT}`)
  );
}

io.on("disconnect", ()=>{
  logger.info("Socket disconnected")
})

export default io;
