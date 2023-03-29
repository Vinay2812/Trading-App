import { UserBankDetails, UserOnlineDetails } from "../../models/User.js";
import { AccountMaster } from "../../models/AccountMaster.js";
import { TenderBalanceView } from "../../models/TenderBalanceView.js";
import logger from "../../utils/logger.js";
import { DailyPublish } from "../../models/DailyPublish.js";
import { DailyBalance } from "../../models/DailyBalance.js";

export const processQueryOutput = {
  forFindAll: (data) => data.map(({ dataValues }) => dataValues),
  forUpdate: (data) => {
    let output =
      data instanceof Array
        ? data.map(({ dataValues }) => dataValues)
        : data?.dataValues;
    return output;
  },
  forInsert: (data) => data?.dataValues,
};
// Get queries
export async function getOnlineUsersByQuery(query) {
  let users = await UserOnlineDetails.findAll(query);
  return processQueryOutput.forFindAll(users);
}

export async function getUserBankDetailsByQuery(query) {
  let data = await UserBankDetails.findAll(query);
  return processQueryOutput.forFindAll(data);
}

export async function getDataFromAccountMaster(query) {
  let output = await AccountMaster.findAll(query);
  return processQueryOutput.forFindAll(output);
}

export async function getDataFromTenderBalanceView(query) {
  let output = await TenderBalanceView.findAll(query);
  return processQueryOutput.forFindAll(output);
}

export async function getDataFromDailyPublish(query) {
  let output = await DailyPublish.findAll(query);
  return processQueryOutput.forFindAll(output);
}

export async function getDataFromDailyBalance(query) {
  let output = await DailyBalance.findAll(query);
  return processQueryOutput.forFindAll(output);
}

// Update queries
export async function updateOnlineUserByQuery(set, query) {
  let [rows, data] = await UserOnlineDetails.update(set, query);
  data = processQueryOutput.forUpdate(data);
  return { rows_affected: rows, data };
}

export async function updateAccountMasterByQuery(set, query) {
  let [rows, data] = await AccountMaster.update(set, query);
  data = processQueryOutput.forUpdate(data);
  return { rows_affected: rows, data };
}

export async function updateDailyPublishByQuery(set, query) {
  let [rows, data] = await DailyPublish.update(set, query);
  data = processQueryOutput.forUpdate(data);
  return { rows_affected: rows, data };
}

// insert queries
export async function insertIntoAccountMaster(
  query,
  options = { returning: true, plain: true }
) {
  const data = await AccountMaster.create(query, options);
  return processQueryOutput.forInsert(data);
}

export async function insertIntoDailyPublish(
  query,
  options = { returning: true, plain: true }
) {
  const data = await DailyPublish.create(query, options);
  return processQueryOutput.forInsert(data);
}
