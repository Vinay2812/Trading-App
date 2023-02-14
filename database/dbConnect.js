import mssql from "mssql"
import dotenv from "dotenv";
dotenv.config();

const config = {
    database: process.env.DATABASE,
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        trustedConnection: true,
        encrypt: false
    }
}

const connection = mssql.connect(config)
    .then(()=>{
        console.log("DB connected");
        return new mssql.Request();
    })
    .catch((err) => console.log(err));

export default connection