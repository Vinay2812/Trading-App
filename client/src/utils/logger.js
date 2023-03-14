import { postError } from "../api/ErrorRequest";

const logger = {
    log: (message, error = false) => {
        if(import.meta.env.DEV){
            console.log(message);
            if(error){
                postError(error).catch(err => console.log("Error - failed to log error\n" + err));
            }
        }
    }
}
export default logger;