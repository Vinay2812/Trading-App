import {config} from "dotenv"
import executeQuery from "../database/executeQuery.js"
config();

export async function adminLogin(req, res){
    const {username, password} = req.body;
    const {ADMIN_USERNAME, ADMIN_PASSWORD} = process.env;
    try {
       
        if(username !== ADMIN_USERNAME){
            return res.status(400).json("Invalid admin username");
        }
        if(password !== ADMIN_PASSWORD){
            return res.status(400).json("Invalid password");
        }
        res.status(200).json({username, admin: 1});
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function getUsers(req, res){
    try {
        const USERS_QUERY = `
            SELECT userId, company_name, email, mobile, authorized, accoid 
            from onlineUserDetails
        `
        const users = await executeQuery(USERS_QUERY);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function updateAuthorization(req, res){
    const { authorized } = req.body;
    const { userId } = req.params;

    try {
        const UPDATE_AUTHORIZATION_QUERY = `
            UPDATE onlineUserDetails
            SET 
                authorized = ${authorized}
            WHERE
                userId = ${userId}
        `
        await executeQuery(UPDATE_AUTHORIZATION_QUERY);
        res.status(200).json("Updated successfully");
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function addUser(req, res){
    const {userId} = req.params;
    try {
        const MAX_AC_CODE_QUERY = `
            SELECT max(Ac_code) as max_ac_code from nt_1_accountmaster WHERE company_code = 1;
        `
        const next_ac_code = (await(await executeQuery(MAX_AC_CODE_QUERY))[0]).max_ac_code + 1;

        const SELECT_USER_QUERY = `
            SELECT company_name, address, pincode, gst, email, pan, mobile, fssai, state, whatsapp, tan
            from onlineUserDetails
            WHERE userId = '${userId}'
        `
        const userData = await(await executeQuery(SELECT_USER_QUERY))[0];
        
        const {company_name, address, pincode, gst, email, pan, mobile, fssai, state, whatsapp, tan} = userData;

        const BANK_QUERY = `
            SELECT TOP 1 bank_name, account_number, ifsc, account_name from userBankDetails
            WHERE userId = '${userId}'
        `
        const bankData = await(await executeQuery(BANK_QUERY))[0];
        const {bank_name, account_number, ifsc, account_name} = bankData;

        const INSERT_NT1_ACCOUNT_MASTER_QUERY = `
            INSERT into nt_1_accountmaster
            (
                Ac_Code, Ac_Name_E, Ac_Name_R, Ac_type, Address_E, 
                Address_R, Pincode, Gst_No, Email_Id, Other_Narration, 
                Bank_Name, Bank_Ac_No, bank_Op_Drcr, Drcr, Short_Name, 
                carporate_party, CompanyPan, Mobile_No, Is_Login, IFSC, 
                FSSAI, Branch1Drcr, Branch2Drcr, Locked, GSTStateCode, 
                UnregisterGST, whatsup_no, Limit_By, Tan_no, TDSApplicable,
                MsOms, userId
            )
            OUTPUT
                inserted.*
            VALUES
            (
                '${next_ac_code}', '${company_name}', '${company_name}', 'P', '${address}', 
                '${address}', '${pincode}', '${gst}', '${email}', 'Online', 
                '${bank_name}', '${account_number}','D', 'D', '${account_name.substring(0, Math.min(15, account_name.length - 1))}',
                'N', '${pan}', '${mobile}', 'Y', '${ifsc}', 
                '${fssai}', 'D', 'D', '0', '${22}',
                '${gst == null ? 1 : 0}', '${whatsapp}', 'N', '${tan}', 'Y',
                'M', '${userId}'  
            )
        `;
        const output = await(await executeQuery(INSERT_NT1_ACCOUNT_MASTER_QUERY))[0];
        const UPDATE_USER_DETAILS = `
            UPDATE onlineUserDetails SET accoid = '${output.accoid}' WHERE userId = '${userId}';
        `

        await executeQuery(UPDATE_USER_DETAILS);
        res.status(200).json(output);
    } catch (err) {
        res.status(500).json(err)
    }
}
