import logger from "../utils/logger.js";
import io from "../connections/socket.connection.js";

let count = 0;
let socket_to_user_map = new Map();
let user_to_socket_map = new Map();

io.on("connect", (socket) => {
  count++;
  logger.info(`${count} users connected to socket`);

  socket.on("add_user", (userId) => {
    socket_to_user_map.set(socket.id, userId);
    user_to_socket_map.set(userId, socket.id);
  });
});

io.on("disconnect", (socket) => {
  console.clear();
  count--;
  logger.info(`${count} users connected to socket`);
  const socketId = socket.id;
  const userId = socket_to_user_map.get(userId);

  socket_to_user_map.delete(socketId);
  user_to_socket_map.delete(userId);
});

export { socket_to_user_map, user_to_socket_map };
