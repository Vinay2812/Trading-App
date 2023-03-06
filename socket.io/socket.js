import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const socket_port = process.env.SOCKET_PORT;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "*",
});

io.on("connect", (socket) => {
  console.log(`${socket.id} connected to socket`);
  socket.on("update_client_list", (msg) => {
    console.log(msg);
    io.emit("refresh_client_list");
  })
  socket.on("disconnect", () => {
    console.log("A user disconnected to socket");
  });
});

httpServer.listen(socket_port, () =>
  console.log("Socket listening on port 5500")
);
export default io;
