import { processQueryOutput } from "../../utils/query.js";
import { DailyPublish } from "./daily_publish.model.js";

export async function getDataFromDailyPublish(query = { where: {} }) {
  let output = await DailyPublish.findAll(query);
  return processQueryOutput.forFindAll(output);
}

export async function updateDailyPublishByQuery(set, query = { where: {} }) {
  let [rows, data] = await DailyPublish.update(set, query);
  data = processQueryOutput.forUpdate(data);
  return { rows_affected: rows, data };
}

export async function insertIntoDailyPublish(
  query,
  options = { returning: true }
) {
  const data = await DailyPublish.create(query, options);
  return processQueryOutput.forInsert(data);
}
