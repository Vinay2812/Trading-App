import executeQuery from "../../database/executeQuery.js";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "../../utils/config.js";
import {
  NT_1_ACCOUNTMASTER,
  ONLINE_USER_DETAILS,
  QRY_TENDER_DO_BALANCE_VIEW,
  QRY_TR_DAILY_BALANCE,
  TR_DAILY_PUBLISH,
  USER_BANK_DETAILS,
} from "../../database/dbSchema.js";
import {
  adminLoginReq,
  updateAuthorizationReq,
  addUserReq,
  mapClientReq,
  insertIntoTrDailyPublishReq,
  updateSingleTradeReq,
  updateAllTradeReq,
  updateSingleSaleRateReq,
  updateAllSaleRateReq,
  modifySingleTradeReq,
} from "./AdminValidator.js";
import { validateReq, joiErrorRes } from "../../utils/joi.js";
import logger from "../../utils/logger.js";
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
} from "./service.js";
import { Op, Sequelize } from "sequelize";

export async function adminLogin(req, res, next) {
  try {
    const { error, value } = validateReq(adminLoginReq, req.body);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    const { username, password } = value;
    if (username !== ADMIN_USERNAME) {
      throw createError.BadRequest("Invalid username");
    }
    if (password !== ADMIN_PASSWORD) {
      throw createError.BadRequest("Invalid password");
    }
    next({ username, admin: 1 });
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function getUsers(req, res, next) {
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
    next(users);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateAuthorization(req, res, next) {
  try {
    const { authorized } = req.body;
    const { userId } = req.params;
    let { error } = validateReq(updateAuthorizationReq, { authorized, userId });
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    await updateOnlineUserByQuery(
      { authorized },
      { where: { userId }, returning: true }
    );
    next(`Authorization updated successfully for ${userId}`);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function addUser(req, res, next) {
  try {
    const { error, value } = validateReq(addUserReq, req.params);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    const { userId } = value;

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
    const { accoid } = await insertIntoAccountMaster(insertData);
    let setQuery = { accoid };
    let updateQuery = { where: { userId }, returning: false };
    await updateOnlineUserByQuery(setQuery, updateQuery);
    next("User added successfully");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function mapClient(req, res, next) {
  try {
    const { error, value } = validateReq(mapClientReq, req.body);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    const { userId, accoid } = value;
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
    next("Mapping was successful");
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
    uniqueList.sort((a, b) => {
      return new Date(b.tender_date) - new Date(a.tender_date);
    });
    next(uniqueList);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function insertIntoTrDailyPublish(req, res, next) {
  try {
    const { error, value } = validateReq(insertIntoTrDailyPublishReq, req.body);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
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
    } = value;

    const tenderExistQuery = {
      attributes: ["tenderid"],
      where: { tenderid: tender_id },
    };
    const tenderIdExist = await getDataFromDailyPublish(tenderExistQuery);
    if (tenderIdExist?.length) {
      throw createError.Conflict("Tender id already exist");
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
    await insertIntoDailyPublish(insertData);
    next("Inserted into trDailypublish");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function getQryTrDailyBalance(req, res, next) {
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
    uniqueList.sort((a, b) => {
      return new Date(a.publish_date) - new Date(b.publish_date);
    });
    next(uniqueList);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateSingleTrade(req, res, next) {
  try {
    const { error, value } = validateReq(updateSingleTradeReq, req.body);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    const { tender_id, status } = value;
    const setQuery = { status };
    const query = { where: { tenderid: tender_id } };

    await updateDailyPublishByQuery(setQuery, query);
    next("Updated trade for tender id " + tender_id);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateAllTrade(req, res, next) {
  try {
    const { error, value } = validateReq(updateAllTradeReq, req.body);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    const { status } = value;
    const setQuery = { status };
    await updateDailyPublishByQuery(setQuery);
    next("Updated all trades");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function stopSingleTrade(req, res) {
  const { error, value } = validateReq(updateSingleTradeReq, req.body);
  if (error) {
    return joiErrorRes(res, error, "stopSingleTrade");
  }
  const { tenderid } = value;
  try {
    const STOP_SINGLE_TENDER = `
            UPDATE ${TR_DAILY_PUBLISH} SET status = 'N' WHERE tenderid = '${tenderid}'
        `;
    await executeQuery(STOP_SINGLE_TENDER);
    res.status(200).json("Stopped tender id" + tenderid);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function startSingleTrade(req, res) {
  const { error, value } = validateReq(stopSingleTradeReq, req.body);
  if (error) {
    return joiErrorRes(res, error, "stopSingleTrade");
  }
  const { tenderid } = value;
  try {
    const START_SINGLE_TENDER = `
            UPDATE ${TR_DAILY_PUBLISH} SET status = 'Y' WHERE tenderid = '${tenderid}'
        `;
    await executeQuery(START_SINGLE_TENDER);
    res.status(200).json("Started tender id" + tenderid);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function stopAllTrade(req, res) {
  try {
    const STOP_ALL_TENDER = `
            UPDATE ${TR_DAILY_PUBLISH} SET status = 'N'
        `;
    await executeQuery(STOP_ALL_TENDER);
    res.status(200).json("Stopped all tender");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function startAllTrade(req, res) {
  try {
    const START_ALL_TENDER = `
            UPDATE ${TR_DAILY_PUBLISH} SET status = 'Y'
        `;
    await executeQuery(START_ALL_TENDER);
    res.status(200).json("Started all tender");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function updateAllSaleRate(req, res, next) {
  try {
    const { error, value } = validateReq(updateAllSaleRateReq, req.body);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    const { sale_rate } = value;
    const setQuery = {
      sale_rate: Sequelize.literal(`sale_rate + ${sale_rate}`),
    };
    await updateDailyPublishByQuery(setQuery);
    next("Updated all sale rate");
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function updateSingleSaleRate(req, res, next) {
  try {
    const { error, value } = validateReq(updateSingleSaleRateReq, req.body);
    if (error) {
      throw createError.UnprocessableEntity(error.details);
    }
    const { tender_id, sale_rate } = value;
    const setQuery = {
      sale_rate: Sequelize.literal(`sale_rate + ${sale_rate}`),
    };
    const query = { where: { tender_id } };
    await updateDailyPublishByQuery(setQuery, query);
    next("Updated sale rate for tender id " + tender_id);
  } catch (err) {
    if (!err.status) err.status = 500;
    next(err);
  }
}

export async function modifySingleTrade(req, res, next) {
  try {
    const { error, value } = validateReq(modifySingleTradeReq, req.body);
    if(error){
      throw createError.UnprocessableEntity(error.details);
    }
    const { tender_id, sale_rate, published_qty } = value;
    // const MODIFY_SINGLE_TRADE = `
    //         UPDATE ${TR_DAILY_PUBLISH}
    //         SET sale_rate = ${sale_rate}, published_qty = ${published_qty}
    //         WHERE tenderid = '${tenderid}'
    //     `;
    // await executeQuery(MODIFY_SINGLE_TRADE);
    const setQuery = { sale_rate, published_qty}
    const query = { where: { tender_id } };
    await updateDailyPublishByQuery(setQuery, query);
    next("Modified trade for tender id " + tender_id);
  } catch (err) {
    if(!err.status) err.status = 500;
    next(err);
  }
}
