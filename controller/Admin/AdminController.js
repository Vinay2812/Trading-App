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
  stopSingleTradeReq,
} from "./AdminValidator.js";
import { validateReq, joiErrorRes } from "../../utils/joi.js";
import logger from "../../utils/logger.js";

export async function adminLogin(req, res) {
  const { error, value } = validateReq(adminLoginReq, req.body);
  if (error) {
    return joiErrorRes(res, error, "adminLogin");
  }
  const { username, password } = value;
  try {
    if (username !== ADMIN_USERNAME) {
      return res.status(400).json("Invalid admin username");
    }
    if (password !== ADMIN_PASSWORD) {
      return res.status(400).json("Invalid password");
    }
    res.status(200).json({ username, admin: 1 });
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function getUsers(req, res) {
  try {
    const USERS_QUERY = `
            SELECT userId, company_name, email, mobile, authorized, accoid 
            from ${ONLINE_USER_DETAILS}
        `;
    const users = await executeQuery(USERS_QUERY);
    res.status(200).json(users);
  } catch (err) {
    logger.error(err, true);
    res.status(500).json(err);
  }
}

export async function updateAuthorization(req, res) {
  const { authorized } = req.body;
  const { userId } = req.params;
  let { error } = validateReq(updateAuthorizationReq, { authorized, userId });
  if (error) {
    return joiErrorRes(res, error, "updateAuthorization");
  }
  try {
    const UPDATE_AUTHORIZATION_QUERY = `
            UPDATE ${ONLINE_USER_DETAILS}
            SET 
                authorized = ${authorized}
            WHERE
                userId = ${userId}
        `;
    await executeQuery(UPDATE_AUTHORIZATION_QUERY);
    res.status(200).json("Updated successfully");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function addUser(req, res) {
  const { error, value } = validateReq(addUserReq, req.params);
  if (error) {
    logger.joiError(error, addUser);
    return res.status(422).json(error.details);
  }
  const { userId } = value;

  try {
    const MAX_AC_CODE_QUERY = `
            SELECT max(Ac_code) as max_ac_code from ${NT_1_ACCOUNTMASTER} WHERE company_code = 1;
        `;
    const next_ac_code =
      (await (await executeQuery(MAX_AC_CODE_QUERY))[0]).max_ac_code + 1;

    const SELECT_USER_QUERY = `
            SELECT company_name, address, pincode, gst, email, pan, mobile, fssai, state, whatsapp, tan
            from ${ONLINE_USER_DETAILS}
            WHERE userId = '${userId}'
        `;
    const userData = await (await executeQuery(SELECT_USER_QUERY))[0];

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

    const BANK_QUERY = `
            SELECT TOP 1 bank_name, account_number, ifsc, account_name from ${USER_BANK_DETAILS}
            WHERE userId = '${userId}'
        `;
    const bankData = await (await executeQuery(BANK_QUERY))[0];
    const { bank_name, account_number, ifsc, account_name } = bankData;

    const INSERT_NT1_ACCOUNT_MASTER_QUERY = `
            INSERT into ${NT_1_ACCOUNTMASTER}
            (
                Ac_Code, Ac_Name_E, Ac_Name_R, Ac_type, Address_E, 
                Address_R, Pincode, Gst_No, Email_Id, Other_Narration, 
                Bank_Name, Bank_Ac_No, bank_Op_Drcr, Drcr, Short_Name, 
                carporate_party, CompanyPan, Mobile_No, Is_Login, IFSC, 
                FSSAI, Branch1Drcr, Branch2Drcr, Locked, GSTStateCode, 
                UnregisterGST, whatsup_no, Limit_By, Tan_no, TDSApplicable,
                MsOms,
                AC_rate, City_Code, Bank_Opening, Opening_Balance,
                Group_Code, Commission, OffPhone, Branch1OB, Branch2OB, Distance,
                Bal_Limit, bsid, cityid, company_code
            )
            OUTPUT
                inserted.accoid
            VALUES
            (
                '${next_ac_code}', '${company_name}', '${company_name}', 'P', '${address}', 
                '${address}', '${pincode}', '${gst}', '${email}', 'Online', 
                '${bank_name}', '${account_number}','D', 'D', '${account_name.substring(
      0,
      Math.min(15, account_name.length - 1)
    )}',
                'N', '${pan}', '${mobile}', 'Y', '${ifsc}', 
                '${fssai}', 'D', 'D', '0', '${state.substring(0, 2)}',
                '${gst == null ? 0 : 1}', '${whatsapp}', 'N', '${tan}', 'Y',
                'M',
                '0', '0', '0', '0',
                '0', '0', '0', '0', '0', '0',
                '0', '0', '0', '1'

            )
        `;
    const output = await (
      await executeQuery(INSERT_NT1_ACCOUNT_MASTER_QUERY)
    )[0];
    res.status(200).json(output);
    const UPDATE_USER_DETAILS = `
            UPDATE ${ONLINE_USER_DETAILS} SET accoid = '${output.accoid}' WHERE userId = '${userId}';
        `;
    await executeQuery(UPDATE_USER_DETAILS);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function mapClient(req, res) {
  const { error, value } = validateReq(mapClientReq, req.body);
  if (error) {
    logger.joiError(error, mapClient);
    return res.status(422).json(error.details);
  }
  const { userId, accoid } = value;
  try {
    const UPDATE_ONLINE_USER = `
            UPDATE ${ONLINE_USER_DETAILS}
            SET accoid = ${accoid}
            WHERE userId = '${userId}'
        `;

    const UPDATE_NT_1_ACCOUNTMASTER = `
            UPDATE ${NT_1_ACCOUNTMASTER}
            SET userId = '${userId}'
            WHERE accoid = '${accoid}'
        `;

    await Promise.all([
      executeQuery(UPDATE_ONLINE_USER),
      executeQuery(UPDATE_NT_1_ACCOUNTMASTER),
    ]);
    res.status(200).json("Mapping was successful");
  } catch (error) {
    logger.info(err);
    res.status(500).json(err);
  }
}

export async function getTenderBalances(req, res) {
  try {
    const GET_TENDER_BALANCES = `
            SELECT Tender_No, Tender_Date, millshortname, itemname,
            paymenttoshortname, tenderdoshortname, season, Grade,
            Quantal, Lifting_Date, Purc_Rate, Mill_Rate, mc, pt, itemcode, ic,
            tenderid, td, Mill_Code, Tender_Do, Payment_To, BALANCE as balance
            from ${QRY_TENDER_DO_BALANCE_VIEW} WHERE balance > 0 AND Buyer = 2
        `;
    const tenderBalances = await executeQuery(GET_TENDER_BALANCES);

    let uniqueKeys = [];
    let uniqueList = [];
    for (let ele of tenderBalances || []) {
      if (!uniqueKeys.includes(ele.tenderid)) {
        uniqueKeys.push(ele.tenderid);
        uniqueList.push(ele);
      }
    }
    uniqueList.sort((a, b) => {
      return new Date(b.Tender_Date) - new Date(a.Tender_Date);
    });
    res.status(200).json(uniqueList);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function insertIntoTrDailyPublish(req, res) {
  const { error, value } = validateReq(insertIntoTrDailyPublishReq, req.body);
  if (error) {
    logger.joiError(error, insertIntoTrDailyPublish);
    return res.status(422).json(error.details);
  }
  const {
    Tender_No,
    Tender_Date,
    season,
    Grade,
    Quantal,
    Lifting_Date,
    Purc_Rate,
    Mill_Rate,
    mc,
    pt,
    itemcode,
    ic,
    tenderid,
    td,
    unit,
    sale_rate,
    publish_quantal,
    multiple_of,
    auto_confirm,
    Tender_Do,
    type,
    Mill_Code,
    Payment_To,
  } = value;

  try {
    const CHECK_TENDER_ID_EXIST = `
            SELECT tenderid from ${TR_DAILY_PUBLISH} WHERE tenderid = '${tenderid}'
        `;
    const tenderIdExist = await executeQuery(CHECK_TENDER_ID_EXIST);
    if (tenderIdExist?.length) {
      res.status(200).json("Tender Id already exist");
      return;
    }
    const publish_date = new Date().toISOString();
    const INSERT_INTO_TR_DAILY_PUBLISH = `
        INSERT into ${TR_DAILY_PUBLISH} 
        (
            tender_no, tenderid, tender_date, publish_date, 
            lifting_date, mill_code, mc, item_code, it, payment_to, 
            pt, doac, doid, season, grade, unit, qty, mill_rate, 
            purc_rate, sale_rate, published_qty, selling_type, multipal_of
            ,auto_confirm, status
        )
        VALUES
        (
            '${Tender_No}', '${tenderid}', '${Tender_Date}', '${publish_date}',
            '${Lifting_Date}', '${Mill_Code}', '${mc}', '${itemcode}', '${ic}', '${Payment_To}',
            '${pt}', '${Tender_Do}', '${td}', '${season}', '${Grade}', '${unit}', '${Quantal}', '${Mill_Rate}',
            '${Purc_Rate}', '${sale_rate}', '${publish_quantal}', '${type}', '${multiple_of}',
            '${auto_confirm}', 'Y'
        )
        `;
    await executeQuery(INSERT_INTO_TR_DAILY_PUBLISH);
    res.status(200).json("Inserted into trDailypublish");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function getQryTrDailyBalance(req, res) {
  try {
    const GET_TR_DAILY_PUBLISH = `
            SELECT * from ${QRY_TR_DAILY_BALANCE} where balance > 0
        `;
    const trDailyPublishList = await executeQuery(GET_TR_DAILY_PUBLISH);

    let uniqueKeys = [];
    let uniqueList = [];
    for (let ele of trDailyPublishList || []) {
      if (!uniqueKeys.includes(ele.tenderid)) {
        uniqueKeys.push(ele.tenderid);
        uniqueList.push(ele);
      }
    }
    uniqueList.sort((a, b) => {
      return new Date(a.publish_date) - new Date(b.publish_date);
    });
    res.status(200).json(uniqueList);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function stopSingleTrade(req, res) {
  const { error, value } = validateReq(stopSingleTradeReq, req.body);
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
export async function updateAllSaleRate(req, res) {
  const { sale_rate } = req.body;
  try {
    const UPDATE_ALL_SALE_RATE = `
            UPDATE ${TR_DAILY_PUBLISH} SET sale_rate = sale_rate + ${sale_rate}
        `;
    await executeQuery(UPDATE_ALL_SALE_RATE);
    res.status(200).json("Updated all sale rate");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function updateSingleSaleRate(req, res) {
  const { tenderid, sale_rate } = req.body;
  try {
    const UPDATE_SINGLE_SALE_RATE = `
            UPDATE ${TR_DAILY_PUBLISH} SET sale_rate = sale_rate + ${sale_rate} WHERE tenderid = '${tenderid}'
        `;
    await executeQuery(UPDATE_SINGLE_SALE_RATE);
    res.status(200).json("Updated sale rate for tender id" + tenderid);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function modifySingleTrade(req, res) {
  const { tenderid, sale_rate, published_qty } = req.body;
  try {
    const MODIFY_SINGLE_TRADE = `
            UPDATE ${TR_DAILY_PUBLISH}
            SET sale_rate = ${sale_rate}, published_qty = ${published_qty}
            WHERE tenderid = '${tenderid}'
        `;
    await executeQuery(MODIFY_SINGLE_TRADE);
    res.status(200).json("Modified trade for tender id" + tenderid);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}
