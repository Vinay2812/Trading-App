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
import "./socket.io/socket.js"

import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = process.env.SERVER_PORT
app.use(cors());
app.use(bodyParser.json());
app.use(helmet())
app.use(morgan(":status :method :url :response-time ms"));

app.use("/auth", AuthRoute);
app.use("/admin", AdminRoute);
app.use("/user", UserRoute);

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

app.listen(port, ()=>{
    console.log(`Server Listening on port ${port}`);
})