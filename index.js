import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import AuthRoute from "./routes/AuthRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ErrorRoute from "./routes/ErrorRoute.js";
import InvalidRoute from "./routes/InvalidRoute.js";
import { SERVER_PORT } from "./utils/config.js";
import { fileURLToPath } from "url";
import "./socket.io/socket.js";
import "./models/User.js";
import logger from "./utils/logger.js";
import { connectMongodb } from "./connections/mongo-connection.js";
import { connectMssql } from "./connections/mssql-connection.js";
import { connectSocket, syncMssql } from "./connections/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express();
const port = SERVER_PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(
  morgan(":status :method :url :response-time ms", {
    skip: (req, res) => {
      logger.info(`${res.statusCode} ${req.method} ${req.url}`);
    },
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use("/auth", AuthRoute);
app.use("/admin", AdminRoute);
app.use("/user", UserRoute);
app.use("/error", ErrorRoute);
app.use(InvalidRoute);

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  logger.info(`Server Listening on port ${port}`);
  connectMongodb();
  connectMssql();
  connectSocket();
  syncMssql();
});
