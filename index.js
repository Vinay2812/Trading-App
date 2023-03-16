import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import "./database/dbConnect.js";
import path from "path"
import AuthRoute from "./routes/AuthRoute.js"
import AdminRoute from "./routes/AdminRoute.js"
import UserRoute from "./routes/UserRoute.js"
import ErrorRoute from "./routes/ErrorRoute.js"
import InvalidRoute from "./routes/InvalidRoute.js"
import "./socket.io/socket.js"
import { SERVER_PORT } from "./utils/config.js";

import { fileURLToPath } from "url";
import logger from "./utils/logger.js";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = SERVER_PORT
app.use(cors());
app.use(bodyParser.json());
app.use(helmet())
app.use(morgan(":status :method :url :response-time ms", {
    skip: (req, res) => {
        logger.log(`${res.statusCode} ${req.method} ${req.url}`);
    }
}));

app.use("/auth", AuthRoute);
app.use("/admin", AdminRoute);
app.use("/user", UserRoute);
app.use("/error", ErrorRoute);
app.use(InvalidRoute);

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

app.listen(port, ()=>{
    logger.log(`Server Listening on port ${port}`);
})