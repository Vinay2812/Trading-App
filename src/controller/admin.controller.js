import { ADMIN_USERNAME, ADMIN_PASSWORD } from "../utils/config.js";
import logger from "../utils/logger.js";
import createError from "http-errors";
import {
  getDataFromAccountMaster,
  getDataFromTenderBalanceView,
  getOnlineUsersByQuery,
  getUserBankDetailsByQuery,
  getDataFromDailyPublish,
  insertIntoAccountMaster,
  updateAccountMasterByQuery,
  updateOnlineUserByQuery,
  insertIntoDailyPublish,
  getDataFromDailyBalance,
  updateDailyPublishByQuery,
} from "../models/index.js";
import { Op, Sequelize } from "sequelize";
import {
  updatePublishedList,
  updateTradingOption,
  updateUserAuthorization,
} from "../socket/controller/emit.js";

export async function adminLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    if (username !== ADMIN_USERNAME) {
      throw createError.BadRequest("Invalid username");
    }
    if (password !== ADMIN_PASSWORD) {
      throw createError.BadRequest("Invalid password");
    }
    next({ data: { username, admin: 1 }, message: "Login successful" });
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function getRegistrationListUsers(req, res, next) {
  try {
    const users = await getOnlineUsersByQuery({
      attributes: [
        "userId",
        "company_name",
        "email",
        "mobile",
        "authorized",
        "accoid",
      ],
    });
    next({
      message: "Successfully fetched registration list users",
      data: users,
    });
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateAuthorization(req, res, next) {
  try {
    const { authorized, userId } = req.body;
    await updateOnlineUserByQuery(
      { authorized },
      { where: { userId }, returning: true }
    );
    next({ message: `Authorization updated successfully for ${userId}` });
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function addUser(req, res, next) {
  try {
    const { userId } = req.body;
    const max_ac_code_query = {
      attributes: [
        [Sequelize.fn("max", Sequelize.col("Ac_code")), "max_ac_code"],
      ],
      where: {
        company_code: 1,
      },
    };
    const { max_ac_code } = (
      await getDataFromAccountMaster(max_ac_code_query)
    )[0];
    const next_ac_code = max_ac_code + 1;
    const get_user_by_id_query = {
      attributes: [
        "company_name",
        "address",
        "pincode",
        "gst",
        "email",
        "pan",
        "mobile",
        "fssai",
        "state",
        "whatsapp",
        "tan",
      ],
      where: { userId },
    };
    const userData = (await getOnlineUsersByQuery(get_user_by_id_query))[0];
    if (!userData) {
      throw createError.BadRequest("User not found");
    }

    const {
      company_name,
      address,
      pincode,
      gst,
      email,
      pan,
      mobile,
      fssai,
      state,
      whatsapp,
      tan,
    } = userData;

    const bankDataQuery = {
      attributes: ["bank_name", "account_number", "ifsc", "account_name"],
      where: { userId },
    };
    const bankData = await getUserBankDetailsByQuery(bankDataQuery);
    if (!bankData.length) {
      throw createError.BadRequest("Bank details not found for this user");
    }
    const { bank_name, account_number, ifsc, account_name } = bankData[0];

    const insertData = {
      ac_code: next_ac_code,
      ac_name_e: company_name,
      ac_name_r: company_name,
      ac_type: "P",
      address_e: address,
      address_r: address,
      pincode,
      gst_no: gst,
      email_id: email,
      other_narration: "Online",
      bank_name,
      bank_ac_no: account_number,
      bank_op_drcr: "D",
      drcr: "D",
      short_name: account_name.substring(
        0,
        Math.min(15, account_name.length - 1)
      ),
      corporate_party: "N",
      company_pan: pan,
      mobile_no: mobile,
      is_login: "Y",
      ifsc,
      fssai,
      branch1drcr: "D",
      branch2drcr: "D",
      locked: "0",
      gststatecode: state.substring(0, 2),
      unregistergst: gst == null ? 0 : 1,
      whatsapp_no: whatsapp,
      limit_by: "N",
      tan_no: tan,
      tdsapplicable: "Y",
      msoms: "M",
      ac_rate: "0",
      city_code: "0",
      bank_opening: "0",
      opening_balance: "0",
      group_code: "0",
      commission: "0",
      offphone: "0",
      branch1ob: "0",
      branch2ob: "0",
      distance: "0",
      bal_limit: "0",
      bsid: "0",
      cityid: "0",
      company_code: "1",
    };
    const { accoid } = await insertIntoAccountMaster(insertData, {
      returning: true,
      plain: true,
    });
    let setQuery = { accoid };
    let updateQuery = { where: { userId }, returning: false };
    await updateOnlineUserByQuery(setQuery, updateQuery);
    next({ message: "User added successfully" });
    const socket_res = await updateUserAuthorization(userId);
    socket_res && logger.debug("Sent request to update authorization");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function mapClient(req, res, next) {
  try {
    const { userId, accoid } = req.body;
    let onlineUser_setQuery = { accoid };
    let onlineUser_query = {
      where: { userId },
    };
    let account_master_setQuery = { userId };
    let account_master_query = {
      where: { accoid },
    };
    await Promise.all([
      updateOnlineUserByQuery(onlineUser_setQuery, onlineUser_query),
      updateAccountMasterByQuery(account_master_setQuery, account_master_query),
    ]);
    next({ message: "Mapping was successful" });
    const socket_res = await updateUserAuthorization(userId, accoid);
    socket_res && logger.debug("Sent request to update authorization");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function getTenderBalances(req, res, next) {
  try {
    const getTenderDetailsQuery = {
      where: {
        [Op.and]: [{ balance: { [Op.gt]: 0 } }, { buyer: 2 }],
      },
    };

    const tenderBalances = await getDataFromTenderBalanceView(
      getTenderDetailsQuery
    );
    let uniqueKeys = [];
    let uniqueList = [];
    for (let ele of tenderBalances || []) {
      if (!uniqueKeys.includes(ele.tender_id)) {
        uniqueKeys.push(ele.tender_id);
        uniqueList.push(ele);
      }
    }
    uniqueList.sort((a, b) => a.tender_no - b.tender_no);
    next({ message: "Successfully fetched tender balances", data: uniqueList });
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function postDailyPublish(req, res, next) {
  try {
    const {
      tender_no,
      tender_date,
      season,
      grade,
      quantal,
      lifting_date,
      purchase_rate,
      mill_rate,
      mc,
      pt,
      item_code,
      ic,
      tender_id,
      td,
      unit,
      sale_rate,
      publish_quantal,
      multiple_of,
      auto_confirm,
      tender_do,
      type,
      mill_code,
      payment_to,
    } = req.body;

    // check if tender exists in daily publish
    const tenderExistQuery = {
      attributes: ["tender_id"],
      where: { tender_id },
    };
    const tenderIdExist = await getDataFromDailyPublish(tenderExistQuery);
    if (tenderIdExist?.length) {
      throw createError.Conflict(
        `tender no ${tender_no} already exist in published list`
      );
    }
    const publish_date = new Date().toISOString();
    const insertData = {
      tender_no,
      tender_id,
      tender_date,
      publish_date,
      lifting_date,
      mill_code,
      mc,
      item_code,
      it: ic,
      payment_to,
      pt,
      doac: tender_do,
      doid: td,
      season,
      grade: grade,
      unit,
      qty: quantal,
      mill_rate,
      purc_rate: purchase_rate,
      sale_rate,
      published_qty: publish_quantal,
      selling_type: type,
      multiple_of,
      auto_confirm,
      status: "Y",
    };
    // insert into daily publish
    await insertIntoDailyPublish(insertData);
    next({ message: "Successfully inserted into daily publish" });
    // tell client to fetch daily publish
    let sent_request = await updatePublishedList();
    sent_request && logger.debug("Sent request to update published list");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function getDailyBalance(req, res, next) {
  try {
    const getDailyBalanceQuery = {
      where: { balance: { [Op.gt]: 0 } },
    };
    const dailybalances = await getDataFromDailyBalance(getDailyBalanceQuery);
    let uniqueKeys = [];
    let uniqueList = [];
    for (let ele of dailybalances || []) {
      if (!uniqueKeys.includes(ele.tender_id)) {
        uniqueKeys.push(ele.tender_id);
        uniqueList.push(ele);
      }
    }
    uniqueList.sort((a, b) => a.tender_no - b.tender_no);
    next({ data: uniqueList, message: "Successfully fetched daily balances" });
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateSingleTrade(req, res, next) {
  try {
    const { tender_id, status } = req.body;
    const setQuery = { status };
    const query = { where: { tender_id }, returning: true };

    const result = (await updateDailyPublishByQuery(setQuery, query)) || [];
    next({
      message: `${status === "Y" ? "Started" : "Stopped"} trade for tender no ${
        result.data[0]?.tender_no
      }`,
    });
    const sent_request = await updateTradingOption();
    sent_request && logger.debug("Sent request to update trading option");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateAllTrade(req, res, next) {
  try {
    const { status } = req.body;
    const setQuery = { status };
    await updateDailyPublishByQuery(setQuery);
    next({
      message: `Successfully ${
        status === "Y" ? "Started" : "Stopped"
      } all trades`,
    });
    const sent_request = await updateTradingOption();
    sent_request && logger.debug("Sent request to update trading option");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateSingleSaleRate(req, res, next) {
  try {
    const { tender_id, sale_rate } = req.body;
    const setQuery = {
      sale_rate: Sequelize.literal(`sale_rate + ${sale_rate}`),
    };
    const query = { where: { tender_id } };
    await updateDailyPublishByQuery(setQuery, query);
    next({ message: "Updated sale rate for tender id " + tender_id });
    const request_sent = await updatePublishedList();
    request_sent && logger.debug(`Sent request to update published list`);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateAllSaleRate(req, res, next) {
  try {
    const { sale_rate } = req.body;
    const setQuery = {
      sale_rate: Sequelize.literal(`sale_rate + ${sale_rate}`),
    };
    await updateDailyPublishByQuery(setQuery);
    next({ message: "Updated all sale rate" });
    const request_sent = await updatePublishedList();
    request_sent && logger.debug(`Sent request to update published list`);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function modifySingleTrade(req, res, next) {
  try {
    const { tender_id, sale_rate, published_qty } = req.body;
    const setQuery = { sale_rate, published_qty };
    const query = { where: { tender_id } };
    await updateDailyPublishByQuery(setQuery, query);
    next({ message: "Modified trade for tender id " + tender_id });
    const request_sent = await updatePublishedList();
    request_sent && logger.debug(`Sent request to update published list`);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function getAllTradeStatus(req, res, next) {
  try {
    const query = {
      attributes: ["status"],
      where: {},
    };
    const statusArr = await getDataFromDailyPublish(query);
    let stop_trading_option = false;
    for (let { status } of statusArr) {
      if (status === "Y") {
        stop_trading_option = true;
        break;
      }
    }
    next({ stop_trading_option });
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}
