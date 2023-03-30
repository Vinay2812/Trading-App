import Joi from "joi";

export const adminLoginReq = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

export const updateAuthorizationReq = Joi.object({
  authorized: Joi.required(),
  userId: Joi.required(),
}).required();

export const addUserReq = Joi.object({
  userId: Joi.required(),
}).required();

export const mapClientReq = Joi.object({
  userId: Joi.required(),
  accoid: Joi.required(),
}).required();

export const insertIntoTrDailyPublishReq = Joi.object({
  tender_no: Joi.required(),
  tender_date: Joi.required(),
  season: Joi.required(),
  grade: Joi.required(),
  quantal: Joi.required(),
  lifting_date: Joi.required(),
  purchase_rate: Joi.required(),
  mill_rate: Joi.required(),
  mc: Joi.required(),
  pt: Joi.required(),
  item_code: Joi.required(),
  ic: Joi.required(),
  tender_id: Joi.required(),
  td: Joi.required(),
  unit: Joi.allow(...["Q", "M", "L"]).required(),
  sale_rate: Joi.required(),
  publish_quantal: Joi.required(),
  multiple_of: Joi.required(),
  auto_confirm: Joi.allow(...["Y", "N"]).required(),
  tender_do: Joi.required(),
  type: Joi.allow(...["F", "P"]).required(),
  mill_code: Joi.required(),
  payment_to: Joi.required(),
}).required();

export const updateSingleTradeReq = Joi.object({
  tender_id: Joi.required(),
  status: Joi.string().required().allow("Y", "N"),
}).required();

export const updateAllTradeReq = Joi.object({
  status: Joi.string().required().allow("Y", "N"),
}).required();

export const updateSingleSaleRateReq = Joi.object({
  tender_id: Joi.required(),
  sale_rate: Joi.number().required(),
}).required();

export const updateAllSaleRateReq = Joi.object({
  sale_rate: Joi.number().required(),
}).required();

export const modifySingleTradeReq = Joi.object({
  tender_id: Joi.required(),
  published_qty: Joi.number().required(),
  sale_rate: Joi.number().required(),
}).required();