import { DataTypes } from "sequelize";
import mssql from "../../connections/mssql.connection.js";
import { QRY_TENDER_DO_BALANCE_VIEW } from "../../database/dbSchema.js";

export const TenderBalanceView = mssql.define(QRY_TENDER_DO_BALANCE_VIEW, {
  tender_no: {
    type: DataTypes.INTEGER,
    field: "Tender_No",
  },
  tender_date: {
    type: DataTypes.DATEONLY,
    field: "Tender_Date",
  },
  mill_short_name: {
    type: DataTypes.STRING,
    field: "millshortname",
  },
  item_name: {
    type: DataTypes.STRING,
    field: "itemname",
  },
  payment_to_name: {
    type: DataTypes.STRING,
    field: "paymenttoshortname",
  },
  tender_do_name: {
    type: DataTypes.STRING,
    field: "tenderdoshortname",
  },
  season: {
    type: DataTypes.STRING,
    field: "season",
  },
  grade: {
    type: DataTypes.STRING,
    field: "Grade",
  },
  quantal: {
    type: DataTypes.ABSTRACT,
    field: "Quantal",
  },
  lifting_date: {
    type: DataTypes.DATEONLY,
    field: "Lifting_Date",
  },
  purchase_rate: {
    type: DataTypes.ABSTRACT,
    field: "Purc_Rate",
  },
  mill_rate: {
    type: DataTypes.ABSTRACT,
    field: "Mill_Rate",
  },
  mc: {
    type: DataTypes.ABSTRACT,
    field: "mc",
  },
  pt: {
    type: DataTypes.ABSTRACT,
    field: "pt",
  },
  item_code: {
    type: DataTypes.ABSTRACT,
    field: "itemcode",
  },
  ic: {
    type: DataTypes.ABSTRACT,
    field: "ic",
  },
  tender_id: {
    type: DataTypes.ABSTRACT,
    field: "tenderid",
  },
  td: {
    type: DataTypes.ABSTRACT,
    field: "td",
  },
  mill_code: {
    type: DataTypes.ABSTRACT,
    field: "Mill_Code",
  },
  tender_do: {
    type: DataTypes.ABSTRACT,
    field: "Tender_Do",
  },
  payment_to: {
    type: DataTypes.ABSTRACT,
    field: "Payment_To",
  },
  balance: {
    type: DataTypes.ABSTRACT,
    field: "BALANCE",
  },
  buyer: {
    type: DataTypes.ABSTRACT,
    field: "Buyer",
  },
});
