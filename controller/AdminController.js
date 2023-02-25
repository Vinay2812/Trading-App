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
                '${bank_name}', '${account_number}','D', 'D', '${account_name.substring(0, Math.min(15, account_name.length - 1))}',
                'N', '${pan}', '${mobile}', 'Y', '${ifsc}', 
                '${fssai}', 'D', 'D', '0', '${state.substring(0, 2)}',
                '${gst == null ? 0 : 1}', '${whatsapp}', 'N', '${tan}', 'Y',
                'M',
                '0', '0', '0', '0',
                '0', '0', '0', '0', '0', '0',
                '0', '0', '0', '1'

            )
        `;

        console.log(INSERT_NT1_ACCOUNT_MASTER_QUERY)
        const output = await(await executeQuery(INSERT_NT1_ACCOUNT_MASTER_QUERY))[0];
        console.log(output)
        const UPDATE_USER_DETAILS = `
            UPDATE onlineUserDetails SET accoid = '${output.accoid}' WHERE userId = '${userId}';
        `

        await executeQuery(UPDATE_USER_DETAILS);
        res.status(200).json(output);
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function mapClient(req, res){
    const {userId, accoid} = req.body;
    try {
        const UPDATE_ONLINE_USER = `
            UPDATE onlineUserDetails
            SET accoid = ${accoid}
            WHERE userId = '${userId}'
        `

        const UPDATE_NT_1_ACCOUNTMASTER = `
            UPDATE nt_1_accountmaster
            SET userId = '${userId}'
            WHERE accoid = '${accoid}'
        `

        await Promise.all([
            executeQuery(UPDATE_ONLINE_USER),
            executeQuery(UPDATE_NT_1_ACCOUNTMASTER)
        ])
        console.log("called")
        res.status(200).json("Mapping was successful")
    } catch (error) {
        res.status(500).json(err);
    }
} 

export async function getTenderBalances(req, res){
    try {
        const GET_TENDER_BALANCES = `
            SELECT Tender_No, Tender_Date, millshortname, itemname, 
            paymenttoshortname, tenderdoshortname, season, Grade, 
            Quantal, Lifting_Date, Purc_Rate, Mill_Rate, mc, pt, itemcode, ic,
            tenderid, td, Mill_Code, Tender_Do, Payment_To, BALANCE as balance
            from qrytenderdobalanceview WHERE balance > 0 AND Buyer = 2
        `;

        const tenderBalances = await executeQuery(GET_TENDER_BALANCES);
        
        let uniqueKeys = [];
        let uniqueList = [];
        for(let ele of tenderBalances){
            if(!uniqueKeys.includes(ele.tenderid)){
                uniqueKeys.push(ele.tenderid);
                uniqueList.push(ele);
            }
        }
        uniqueList.sort((a, b) => {
            return new Date(b.Tender_Date) - new Date(a.Tender_Date)
        });
        res.status(200).json(uniqueList);
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function insertIntoTrDailyPublish(req, res){
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
        Payment_To
    } = req.body;

    try {
        const CHECK_TENDER_ID_EXIST = `
            SELECT tenderid from trDailypublish WHERE tenderid = '${tenderid}'
        `
        const tenderIdExist = await executeQuery(CHECK_TENDER_ID_EXIST);
        if(tenderIdExist.length > 0){
            res.status(200).json("Tender Id already exist");
            return;
        }
        const publish_date = (new Date()).toISOString();
        const INSERT_INTO_TR_DAILY_PUBLISH = `
        INSERT into trDailypublish 
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
        `
        await executeQuery(INSERT_INTO_TR_DAILY_PUBLISH);
        res.status(200).json("Inserted into trDailypublish")
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function getQryTrDailyBalance(req, res){
    try {
        const GET_TR_DAILY_PUBLISH = `
            SELECT * from qrytrdailybalance where balance > 0
        `
        const trDailyPublishList = await executeQuery(GET_TR_DAILY_PUBLISH);
        
        let uniqueKeys = [];
        let uniqueList = [];
        for(let ele of trDailyPublishList){
            if(!uniqueKeys.includes(ele.tenderid)){
                uniqueKeys.push(ele.tenderid);
                uniqueList.push(ele);
            }
        }
        uniqueList.sort((a, b) => {
            return new Date(a.publish_date) - new Date(b.publish_date);
        })
        res.status(200).json(uniqueList)
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function stopSingleTrade(req, res){
    const {tenderid} = req.body;
    try {
        const STOP_SINGLE_TENDER = `
            UPDATE trDailypublish SET status = 'N' WHERE tenderid = '${tenderid}'
        `
        await executeQuery(STOP_SINGLE_TENDER);
        res.status(200).json("Stopped tender " + tenderid)
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function stopAllTrade(req, res){
    try {
        const STOP_ALL_TENDER = `
            UPDATE trDailypublish SET status = 'N'
        `
        await executeQuery(STOP_ALL_TENDER);
        res.status(200).json("Stopped all tender")
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function startSingleTrade(req, res){
    const {tenderid} = req.body;
    try {
        const START_SINGLE_TENDER = `
            UPDATE trDailypublish SET status = 'Y' WHERE tenderid = '${tenderid}'
        `
        await executeQuery(START_SINGLE_TENDER);
        res.status(200).json("Started tender " + tenderid)
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function updateAllSaleRate(req, res){
    const {sale_rate} = req.body;
    try {
        const UPDATE_ALL_SALE_RATE = `
            UPDATE trDailypublish SET sale_rate = sale_rate + ${sale_rate}
        `
        await executeQuery(UPDATE_ALL_SALE_RATE);
        res.status(200).json("Updated all sale rate")
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function updateSingleSaleRate(req, res){
    const {tenderid, sale_rate} = req.body;
    try {
        const UPDATE_SINGLE_SALE_RATE = `
            UPDATE trDailypublish SET sale_rate = sale_rate + ${sale_rate} WHERE tenderid = '${tenderid}'
        `
        await executeQuery(UPDATE_SINGLE_SALE_RATE);
        res.status(200).json("Updated sale rate for tender " + tenderid)
    } catch (err) {
        res.status(500).json(err);
    }
}