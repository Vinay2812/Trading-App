import executeQuery from "../../database/executeQuery.js";
import { getRandomId, getRandomOtp } from "../../utils/random.js";
import sendEMail from "../../utils/email.js";
import bcrypt from "bcrypt";
import {
  ONLINE_USER_DETAILS,
  USER_BANK_DETAILS,
  USER_CONTACT_DETAILS,
  USER_OTP_DETAILS,
} from "../../database/dbSchema.js";
import {
  OTP_REFRESH_INTERVAL,
  OTP_VALID_INTERVAL,
} from "../../utils/config.js";
import logger from "../../utils/logger.js";

export async function register(req, res) {
  const { userData, bankData, contactData } = req.body;
  try {
    const CHECK_USER = `
            SELECT userId from ${ONLINE_USER_DETAILS}
            WHERE company_name = '${userData.company_name}' AND mobile like '%${userData.mobile}'
        `;
    const checkUserExist = await executeQuery(CHECK_USER);
    if (checkUserExist.length) {
      res.status(400).json("User already exist with this company and mobile");
      return;
    }
    const new_user_id = getRandomId();
    const USER_DATA_QUERY = `
            INSERT into ${ONLINE_USER_DETAILS}
                (userId, company_name, email, address, state, district, pincode, mobile, whatsapp, gst, pan, fssai, tan, constitution_of_firm)
            OUTPUT inserted.*
            VALUES
                ( '${new_user_id}',
                  '${userData.company_name}', 
                 '${userData.email}', 
                 '${userData.address}', 
                 '${userData.state}',
                 '${userData.district}',
                  '${userData.pincode}',
                  '${userData.mobile}',
                  '${userData.whatsapp}',
                  '${userData.gst}',
                  '${userData.pan}',
                  '${userData.fssai}',
                  '${userData.tan}',
                  '${userData.constitution_of_firm}'
                )
            `;
    const userDetails = await (await executeQuery(USER_DATA_QUERY))[0];
    res.status(200).json({
      userData: userDetails,
    });
    const { userId, email } = userDetails;

    // insert all bank details
    Promise.all(
      bankData.map(async (data) => {
        const {
          account_name,
          account_number,
          account_type,
          bank_name,
          branch,
          ifsc,
        } = data;
        const BANK_DATA_QUERY = `
                INSERT into ${USER_BANK_DETAILS}
                    (userId, account_name, account_number, account_type, bank_name, branch, ifsc)
                OUTPUT inserted.*
                VALUES
                (
                    '${userId}',
                    '${account_name}',
                    '${account_number}',
                    '${account_type}',
                    '${bank_name}',
                    '${branch}',
                    '${ifsc}'
                )
            `;

        return await (
          await executeQuery(BANK_DATA_QUERY)
        )[0];
      })
    );

    // insert all contact details
    Promise.all(
      contactData.map(async (data) => {
        const { full_name, designation, mobile, whatsapp, email } = data;
        const CONTACT_QUERY = `
                INSERT into ${USER_CONTACT_DETAILS}
                    (userId, full_name, designation, mobile, whatsapp, email)
                OUTPUT inserted.*
                VALUES
                (
                    '${userId}',
                    '${full_name}',
                    '${designation}',
                    '${mobile}',
                    '${whatsapp ? whatsapp : ""}',
                    '${email}'
                )
                
            `;

        return await (
          await executeQuery(CONTACT_QUERY)
        )[0];
      })
    );

    const OTP = getRandomOtp();
    await sendEMail(email, OTP);

    const genSalt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(OTP, genSalt);
    const create_time = Date.now();
    const delete_time = create_time + OTP_VALID_INTERVAL; // valid for 5 minutes
    const OTP_QUERY = `
        INSERT into userOTPDetails (userId, otp, create_time, delete_time)
        VALUES
        (
            '${userId}',
            '${hashedOTP}',
            '${create_time}',
            '${delete_time}'
        )
    `;
    executeQuery(OTP_QUERY);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function validateOTP(req, res) {
  const { userId, otp } = req.body;
  try {
    const VALIDATE_QUERY = `
            SELECT * from userOTPDetails 
            WHERE userId = '${userId}'
        `;
    const DELETE_QUERY = `
            DELETE from userOTPDetails
            WHERE userId = '${userId}'
        `;

    const queryOutput = await executeQuery(VALIDATE_QUERY);
    logger.info(queryOutput);
    if (!queryOutput || !queryOutput?.length) {
      return res.status(400).json("Invalid user id");
    }
    const isValidOtp = await bcrypt.compare(otp, (await queryOutput[0]).otp);
    logger.info(isValidOtp);
    if (!isValidOtp) {
      return res.status(403).json("Invalid otp");
    }
    res.status(200).json("Validation successful");
    await executeQuery(DELETE_QUERY);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function getCompany(req, res) {
  const { mobile } = req.params;
  try {
    const COMPANY_QUERY = `
            SELECT company_name from ${ONLINE_USER_DETAILS}
            WHERE
                mobile like '%${mobile}'
        `;
    const companies = await executeQuery(COMPANY_QUERY);
    res.status(200).json(companies);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function login(req, res) {
  const { mobile, company_name, password } = req.body;
  try {
    const USER_ID_QUERY = `
            SELECT * from ${ONLINE_USER_DETAILS}
            WHERE
                mobile like '%${mobile}' AND company_name = '${company_name}'
        `;
    const queryOutput = await executeQuery(USER_ID_QUERY);
    if (!queryOutput || !queryOutput?.length) {
      res.status(400).json("Invalid mobile and company name");
      return;
    }
    const userData = queryOutput[0];
    if (userData.password) {
      const passwordMatched = await bcrypt.compare(password, userData.password);
      if (!passwordMatched) {
        res.status(400).json("Invalid password!");
        return;
      }
    }
    const data = { userData };
    res.status(200).json(data);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function updatePassword(req, res) {
  const { userId, password } = req.body;
  try {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const UPDATE_PASSWORD_QUERY = `
            UPDATE ${ONLINE_USER_DETAILS} 
            SET password = '${hashedPassword}'
            WHERE
                userId = '${userId}'
        `;

    await executeQuery(UPDATE_PASSWORD_QUERY);
    res.status(200).json("Password updated successfully");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function sendOTP(req, res) {
  const { userId } = req.body;
  try {
    const DELETE_QUERY = `
            DELETE from userOTPDetails
            WHERE userId = '${userId}'
        `;
    await executeQuery(DELETE_QUERY);

    const GET_EMAIL_QUERY = `
            SELECT email from ${ONLINE_USER_DETAILS}
            WHERE userId = '${userId}'
        `;
    const email = await (await executeQuery(GET_EMAIL_QUERY))[0].email;
    const OTP = getRandomOtp();
    await sendEMail(email, OTP);

    const genSalt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(OTP, genSalt);
    const create_time = Date.now();
    const delete_time = create_time + parseInt(OTP_VALID_INTERVAL);
    const OTP_QUERY = `
            INSERT into userOTPDetails
                (userId, otp, create_time, delete_time)
            OUTPUT inserted.*
            VALUES
            (
                '${userId}',
                '${hashedOTP}',
                '${create_time}',
                '${delete_time}'
            )
        `;
    await executeQuery(OTP_QUERY);
    res.status(200).json("Otp sent successfull");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function getUser(req, res) {
  const { company_name, mobile } = req.body;
  try {
    const GET_USER_QUERY = `
            SELECT userId from ${ONLINE_USER_DETAILS}
            WHERE company_name = '${company_name}' AND mobile = '${mobile}'
        `;
    const queryOutput = await (await executeQuery(GET_USER_QUERY))[0];
    res.status(200).json(queryOutput);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function getOTP(req, res) {
  const { userId } = req.params;
  try {
    const GET_OTP_QUERY = `
            SELECT * from ${USER_OTP_DETAILS}
            WHERE userId = '${userId}'
        `;

    const queryOutput = await executeQuery(GET_OTP_QUERY);
    if (!queryOutput.length) {
      res.status(400).json("Invalid user id");
      return;
    }
    res.status(200).json("Valid user");
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
}

export async function invalidateOtps() {
  try {
    const DELETE_OTPS_QUERY = `
      DELETE from ${USER_OTP_DETAILS} 
      OUTPUT deleted.userId
      WHERE delete_time  <= ${Date.now()}
    `;
    const deletedOtps = await executeQuery(DELETE_OTPS_QUERY, false);
    deletedOtps.length &&
      logger.info(
        `Deleted ${deletedOtps
          .map((data) => "userId - " + data.userId)
          .join("-")} otp(s)`
      );
    setInterval(() => {
      invalidateOtps();
    }, OTP_REFRESH_INTERVAL);
  } catch (err) {
    logger.error(err);
  }
}
