import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import crypto from "crypto";
// import * as logs from "../logs/debug.log"

// connections
import {
  connectMssql,
  connectRedis,
  connectSocket,
} from "./connections/index.js";
import syncMssql from "./models/sync.js";

// routes
import AuthRoute from "./routes/auth.route.js";
import AdminRoute from "./routes/admin.route.js";
import UserRoute from "./routes/user.route.js";
import ErrorRoute from "./routes/error.route.js";
import InvalidRoute from "./routes/invalid.route.js";

// utils
import { SERVER_PORT, SERVER_HOST } from "./utils/config.js";
import logger from "./utils/logger.js";

// others
// import "./socket.io/socket.js";
import { invalidateOtps } from "./controller/auth.controller.js";
import { ApiResponse } from "./middlewares/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express();
const port = SERVER_PORT;

// middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan(":status :method :url :response-time ms"));

// routes
// check connection
app.post("/", async (req, res, next) => {
  next({ message: "Connection established" });
});
// handle valid routes
app.use("/admin", AdminRoute);
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/error", ErrorRoute);

// handle invalid routes
app.use(InvalidRoute);

// response middleware
app.use(ApiResponse);

function startServer() {
  logger.info("Starting server.............");
  logger.info(`Server Listening on ${SERVER_HOST}:${port}`);
  connectMssql();
  connectSocket();
  connectRedis();
  syncMssql();
  // invalidateOtps();
}
app.listen(port, () => {
  startServer();
});
