import executeQuery from "../database/executeQuery.js";
import genereateOTP from "../utils/otp.js";
import sendEMail from "../utils/email.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

export async function register(req, res) {
  const { userData, bankData, contactData } = req.body;
  try {
    const CHECK_USER = `
            SELECT userId from onlineUserDetails
            WHERE company_name = '${
              userData.company_name
            }' AND mobile like '%${userData.mobile.substring(
      userData.mobile.length - 10,
      userData.mobile.length
    )}'
        `;
    const checkUserExist = await executeQuery(CHECK_USER);

    if (checkUserExist.length) {
      res.status(400).json("User already exist with this company and mobile");
      return;
    }
    const USER_DATA_QUERY = `
            INSERT into onlineUserDetails
                (company_name, email, address, state, district, pincode, mobile, whatsapp, gst, pan, fssai, tan, constitution_of_firm)
            OUTPUT
                inserted.*
            VALUES
                ('${userData.company_name}', 
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
    const { userId, email } = userDetails;

    const bankDetails = await Promise.all(
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
                INSERT into userBankDetails
                    (userId, account_name, account_number, account_type, bank_name, branch, ifsc)
                OUTPUT
                    inserted.*
                VALUES
                (
                    ${userId},
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

    const contactDetails = await Promise.all(
      contactData.map(async (data) => {
        const { full_name, designation, mobile, whatsapp, email } = data;
        const CONTACT_QUERY = `
                INSERT into userContactDetails
                    (userId, full_name, designation, mobile, whatsapp, email)
                OUTPUT
                    inserted.*
                VALUES
                (
                    ${userId},
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

    const OTP = genereateOTP();
    await sendEMail(email, OTP);

    const genSalt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(OTP, genSalt);

    const OTP_QUERY = `
            INSERT into userOTPDetails
                (userId, otp)
            VALUES
            (
                '${userId}',
                '${hashedOTP}'
            )
        `;
    await executeQuery(OTP_QUERY);
    res.status(200).json({
      userData: userDetails,
      bankData: bankDetails,
      contactData: contactDetails,
    });
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function validateOTP(req, res) {
  const { userId, otp } = req.body;
  try {
    const VALIDATE_QUERY = `
            SELECT * from userOTPDetails 
            WHERE
                userId = '${userId}'
        `;
    const DELETE_QUERY = `
            DELETE from userOTPDetails
            WHERE
                userId = '${userId}'
        `;

    const queryOutput = await executeQuery(VALIDATE_QUERY);
    if (!queryOutput || !queryOutput?.length) {
      return res.status(400).json("Invalid user id");
    }
    const isValidOtp = await bcrypt.compare(otp, (await queryOutput[0]).otp);
    if (!isValidOtp) {
      return res.status(403).json("Invalid otp");
    }
    await executeQuery(DELETE_QUERY);
    res.status(200).json("Validation successful");
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function getCompany(req, res) {
  const { mobile } = req.params;
  try {
    const COMPANY_QUERY = `
            SELECT company_name from onlineUserDetails
            WHERE
                mobile like '%${mobile}'
        `;
    const companies = await executeQuery(COMPANY_QUERY);
    res.status(200).json(companies);
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function login(req, res) {
  const { mobile, company_name, password } = req.body;
  try {
    const USER_ID_QUERY = `
            SELECT * from onlineUserDetails
            WHERE
                mobile like '%${mobile}' AND company_name = '${company_name}'
        `;
    const queryOutput = await executeQuery(USER_ID_QUERY);
    if (!queryOutput || !queryOutput?.length) {
      res.status(400).json("Invalid mobile and company name");
      return;
    }
    const userData = (await queryOutput)[0];
    if (userData.password) {
      const passwordMatched = await bcrypt.compare(password, userData.password);
      if (!passwordMatched) {
        res.status(400).json("Invalid password!");
        return;
      }
    }

    const BANK_QUERY = `
            SELECT * from userBankDetails
            WHERE
                userId = '${userData.userId}'
        `;
    const CONTACT_QUERY = `
            SELECT * from userContactDetails
            WHERE
                userId = '${userData.userId}'
        `;
    const bankData = await executeQuery(BANK_QUERY);
    const contactData = await executeQuery(CONTACT_QUERY);
    const data = { userData, bankData, contactData };
    res.status(200).json(data);
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function updatePassword(req, res) {
  const { userId, password } = req.body;
  try {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const UPDATE_PASSWORD_QUERY = `
            UPDATE onlineUserDetails 
            SET password = '${hashedPassword}'
            WHERE
                userId = '${userId}'
        `;

    await executeQuery(UPDATE_PASSWORD_QUERY);
    res.status(200).json("Password updated successfully");
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function sendOTP(req, res) {
  const { userId } = req.body;
  try {
    const DELETE_QUERY = `
            DELETE from userOTPDetails
            WHERE
                userId = '${userId}'
        `;
    await executeQuery(DELETE_QUERY);

    const GET_EMAIL_QUERY = `
            SELECT email from onlineUserDetails
            WHERE
                userId = '${userId}'
        `;
    const email = await (await executeQuery(GET_EMAIL_QUERY))[0].email;
    const OTP = genereateOTP();
    await sendEMail(email, OTP);

    const genSalt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(OTP, genSalt);

    const OTP_QUERY = `
            INSERT into userOTPDetails
                (userId, otp)
            OUTPUT
                inserted.*
            VALUES
            (
                '${userId}',
                '${hashedOTP}'
            )
        `;
    await executeQuery(OTP_QUERY);
    res.status(200).json("Otp sent successfull");
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function getUser(req, res) {
  const { company_name, mobile } = req.body;
  try {
    const GET_USER_QUERY = `
            SELECT userId from onlineUserDetails
            WHERE company_name = '${company_name}' AND mobile = '${mobile}'
        `;
    const queryOutput = await (await executeQuery(GET_USER_QUERY))[0];
    res.status(200).json(queryOutput);
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}

export async function getOTP(req, res) {
  const { userId } = req.params;
  try {
    const GET_OTP_QUERY = `
            SELECT * from userOTPDetails
            WHERE 
                userId = '${userId}'
        `;

    const queryOutput = await executeQuery(GET_OTP_QUERY);
    if (!queryOutput.length) {
      res.status(400).json("Invalid user id");
      return;
    }
    res.status(200).json("Valid");
  } catch (err) {
    logger.log(err);
    res.status(500).json(err);
  }
}
