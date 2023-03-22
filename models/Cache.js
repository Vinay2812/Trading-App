import mssql from "../connections/mssql-connection.js"
import { DataTypes } from "sequelize";
import { TRADING_APP_CACHES } from "../database/dbSchema.js";

export const Cache = mssql.define(TRADING_APP_CACHES, {
    key: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});