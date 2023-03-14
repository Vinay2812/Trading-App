import executeQuery from "../database/executeQuery.js";
import { NT_1_ACCOUNTMASTER, ONLINE_USER_DETAILS } from "../utils/db.js";

export async function getUserCompanyDataById(req, res) {
  const { userId } = req.params;
  try {
    const GET_USER = `
            SELECT userId, company_name, gst, address, state, district
            from ${ONLINE_USER_DETAILS}
            WHERE userId = '${userId}'
        `;
    const userData = await (await executeQuery(GET_USER))[0];

    res.status(200).json(userData);
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function getAllCompanyName(req, res) {
  try {
    const GET_COMPANY_QUERY = `
        SELECT Ac_Name_E, accoid from ${NT_1_ACCOUNTMASTER} 
        WHERE company_code = 1 AND userId is null
        ORDER BY Ac_Name_E
       `;

    const companies = await executeQuery(GET_COMPANY_QUERY);
    res.status(200).json(companies);
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function getUserDataFromNt1AccountMaster(req, res) {
  const { accoid } = req.params;
  try {
    const GET_DATA_QUERY = `
            SELECT accoid, Ac_Code, Ac_Name_E, Address_E, Gst_No
            from ${NT_1_ACCOUNTMASTER}
            WHERE accoid = '${accoid}'
        `;

    const userData = await (await executeQuery(GET_DATA_QUERY))[0];
    res.status(200).json(userData);
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}
