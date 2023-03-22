import mssql from "../connections/mssql-connection.js";
import { DataTypes } from "sequelize";
import {
  ONLINE_USER_DETAILS,
  USER_BANK_DETAILS,
} from "../database/dbSchema.js";

export const UserOnlineDetails = mssql.define(ONLINE_USER_DETAILS, {
  userId: {
    type: DataTypes.STRING(100),
    allowNull: false,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING(100),
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING(100),
    defaultValue: null,
  },
  password: {
    type: DataTypes.STRING(100),
    defaultValue: null,
  },
  address: {
    type: DataTypes.STRING(250),
    defaultValue: null,
  },
  state: {
    type: DataTypes.STRING(50),
    defaultValue: null,
  },
  district: {
    type: DataTypes.STRING(50),
    defaultValue: null,
  },
  pincode: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  mobile: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  whatsapp: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  gstin: {
    type: DataTypes.STRING(15),
    defaultValue: null,
  },
  pan: {
    type: DataTypes.STRING(10),
    defaultValue: null,
  },
  fssai: {
    type: DataTypes.STRING(15),
    defaultValue: null,
  },
  tan: {
    type: DataTypes.STRING(10),
    defaultValue: null,
  },
  constitution_of_firm: {
    type: DataTypes.STRING(50),
    defaultValue: null,
  },
  authorized: {
    type: DataTypes.BOOLEAN,
    defaultValue: null,
  },
  accoid: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

export const UserBankDetails = mssql.define(USER_BANK_DETAILS, {
  userId: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  bank_name: DataTypes.STRING(100),
  account_name: DataTypes.STRING(100),
  account_number: DataTypes.INTEGER,
  ifsc: DataTypes.STRING(20),
  branch: DataTypes.STRING(100),
  account_type: DataTypes.STRING(50),
});

