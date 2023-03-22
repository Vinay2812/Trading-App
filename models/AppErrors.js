import { DataTypes } from "sequelize"
import mssql from "../connections/mssql-connection.js"
import { TRADING_APP_ERRORS } from "../database/dbSchema.js"

export const AppErrors = mssql.define(TRADING_APP_ERRORS, {
    errorId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    error_from:{
        type: DataTypes.STRING(10),
        defaultValue: "server",
    },
    error: {
        type: DataTypes.TEXT,
    },
    error_time:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
})