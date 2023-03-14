import { config } from "dotenv";
import dump from "./dump.js";
import { NODE_ENV } from "./config.js";
import { convertDate } from "./date.js";

config();

const logger = {
  log: (message, error = false) => {
    let data = {
      msg: message,
      time: convertDate(new Date().toString())
    };
    data = JSON.stringify(data).split(/[\s\n"]/g)
    .filter((d) => d !== "")
    .join(" ").replaceAll("\\n", "");
    if (NODE_ENV !== "production") {
      console.log(data);
    }
    dump(data, true, false);
  },
};
export default logger;
