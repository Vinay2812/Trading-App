import mssql from "../connections/mssql-connection.js";
import { DataTypes } from "sequelize";
import {
  ONLINE_USER_DETAILS,
  USER_BANK_DETAILS,
  USER_CONTACT_DETAILS,
  USER_OTP_DETAILS,
} from "../database/dbSchema.js";

export const UserOnlineDetails = mssql.define(ONLINE_USER_DETAILS, {
  userId: {
    type: DataTypes.STRING(100),
    allowNull: false,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  pincode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  whatsapp: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  gst: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  pan: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  fssai: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  tan: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  constitution_of_firm: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  authorized: {
    type: DataTypes.STRING(1),
  },
  accoid: {
    type: DataTypes.INTEGER,
  },
});

export const UserBankDetails = mssql.define(USER_BANK_DETAILS, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
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

export const UserContactDetails = mssql.define(USER_CONTACT_DETAILS, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  full_name: DataTypes.STRING(50),
  designation: DataTypes.STRING(50),
  mobile: DataTypes.STRING(15),
  whatsapp: DataTypes.STRING(15),
  email: DataTypes.STRING(100),
});

export const UserOtpDetails = mssql.define(USER_OTP_DETAILS, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: DataTypes.STRING(100),
  otp: DataTypes.STRING(200),
  create_time: DataTypes.BIGINT,
  expiry_time: {
    type: DataTypes.BIGINT,
    field: "delete_time"
  },
});
