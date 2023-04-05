import { processQueryOutput } from "../../utils/query.js";
import { UserOnlineDetails } from "./users.model.js";

export async function getOnlineUsersByQuery(query = { where: {} }) {
  let users = await UserOnlineDetails.findAll(query);
  return processQueryOutput.forFindAll(users);
}

export async function getUserBankDetailsByQuery(query = { where: {} }) {
  let data = await UserBankDetails.findAll(query);
  return processQueryOutput.forFindAll(data);
}

export async function updateOnlineUserByQuery(set, query = { where: {} }) {
  let [rows, data] = await UserOnlineDetails.update(set, query);
  data = processQueryOutput.forUpdate(data);
  return { rows_affected: rows, data };
}
