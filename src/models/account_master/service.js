import { processQueryOutput } from "../../utils/query.js";
import { AccountMaster } from "./account_master.model.js";

export async function getDataFromAccountMaster(query = { where: {} }) {
  let output = await AccountMaster.findAll(query);
  return processQueryOutput.forFindAll(output);
}

export async function updateAccountMasterByQuery(set, query = { where: {} }) {
  let [rows, data] = await AccountMaster.update(set, query);
  data = processQueryOutput.forUpdate(data);
  return { rows_affected: rows, data };
}

export async function insertIntoAccountMaster(
  query,
  options = { returning: true }
) {
  const data = await AccountMaster.create(query, options);
  return processQueryOutput.forInsert(data);
}
