import { processQueryOutput } from "../../utils/query.js";
import { DailyBalance } from "./daily_balance.model.js";

export async function getDataFromDailyBalance(query = { where: {} }) {
  let output = await DailyBalance.findAll(query);
  return processQueryOutput.forFindAll(output);
}
