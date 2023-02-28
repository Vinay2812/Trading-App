import { io } from "socket.io-client";
const {VITE_TARGET_SOCKET_URL} = import.meta.env;
const socket = io(VITE_TARGET_SOCKET_URL);
export default socket;