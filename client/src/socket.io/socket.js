import { io } from "socket.io-client";
const {VITE_TARGET_SOCKET_URL} = import.meta.env;
const socket = io(VITE_TARGET_SOCKET_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000 * 5,
    transports: ['websocket'],
    port: 5500
});
export default socket;