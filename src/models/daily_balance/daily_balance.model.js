import { DataTypes } from "sequelize";
import mssql from "../../connections/mssql.connection.js";
import { QRY_TR_DAILY_BALANCE } from "../../database/dbSchema.js";

export const DailyBalance = mssql.define(QRY_TR_DAILY_BALANCE, {
  tender_no: {
    type: DataTypes.INTEGER,
    field: "tender_no",
  },
  tender_id: {
    type: DataTypes.INTEGER,
    field: "tenderid",
  },
  tender_date: {
    type: DataTypes.DATEONLY,
    field: "tender_date",
  },
  published_qty: {
    type: DataTypes.ABSTRACT,
    field: "published_qty",
  },
  publish_date: {
    type: DataTypes.DATEONLY,
    field: "publish_date",
  },
  lifting_date: {
    type: DataTypes.DATEONLY,
    field: "lifting_date",
  },
  mill_code: {
    type: DataTypes.ABSTRACT,
    field: "mill_code",
  },
  mc: {
    type: DataTypes.ABSTRACT,
    field: "mc",
  },
  payment_to: {
    type: DataTypes.ABSTRACT,
    field: "payment_to",
  },
  item_code: {
    type: DataTypes.ABSTRACT,
    field: "item_code",
  },
  it: {
    type: DataTypes.ABSTRACT,
    field: "it",
  },
  pt: {
    type: DataTypes.ABSTRACT,
    field: "pt",
  },
  do_ac: {
    type: DataTypes.ABSTRACT,
    field: "doac",
  },
  do_id: {
    type: DataTypes.ABSTRACT,
    field: "doid",
  },
  season: {
    type: DataTypes.ABSTRACT,
    field: "season",
  },
  grade: {
    type: DataTypes.ABSTRACT,
    field: "grade",
  },
  unit: {
    type: DataTypes.ABSTRACT,
    field: "unit",
  },
  quantity: {
    type: DataTypes.ABSTRACT,
    field: "qty",
  },
  mill_rate: {
    type: DataTypes.ABSTRACT,
    field: "mill_rate",
  },
  sale_rate: {
    type: DataTypes.ABSTRACT,
    field: "sale_rate",
  },
  purchase_rate: {
    type: DataTypes.ABSTRACT,
    field: "purc_rate",
  },
  selling_type: {
    type: DataTypes.ABSTRACT,
    field: "selling_type",
  },
  multiple_of: {
    type: DataTypes.ABSTRACT,
    field: "multipal_of",
  },
  auto_confirm: {
    type: DataTypes.ABSTRACT,
    field: "auto_confirm",
  },
  status: {
    type: DataTypes.ABSTRACT,
    field: "status",
  },
  auto_id: {
    type: DataTypes.ABSTRACT,
    field: "autoid",
    primaryKey: true,
  },
  mill_short_name: {
    type: DataTypes.ABSTRACT,
    field: "millshortname",
  },
  item_name: {
    type: DataTypes.ABSTRACT,
    field: "itemname",
  },
  payment_to_name: {
    type: DataTypes.ABSTRACT,
    field: "paymenttoshortname",
  },
  tender_do_name: {
    type: DataTypes.ABSTRACT,
    field: "tenderdoshortname",
  },
  sold: {
    type: DataTypes.ABSTRACT,
    field: "sold",
  },
  balance: {
    type: DataTypes.ABSTRACT,
    field: "balance",
  },
});
