import { processQueryOutput } from "../../utils/query.js";
import { TenderBalanceView } from "./tender_balance_view.model.js";

export async function getDataFromTenderBalanceView(query = { where: {} }) {
  let output = await TenderBalanceView.findAll(query);
  return processQueryOutput.forFindAll(output);
}
