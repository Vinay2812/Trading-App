import executeQuery from "./executeQuery.js";
import logger from "../utils/logger.js";

export const ONLINE_USER_DETAILS = "onlineUserDetails";
export const USER_BANK_DETAILS = "userBankDetails";
export const USER_CONTACT_DETAILS = "userContactDetails";
export const USER_OTP_DETAILS = "userOTPDetails";
export const NT_1_ACCOUNTMASTER = "nt_1_accountmaster";
export const QRY_TENDER_DO_BALANCE_VIEW = "qrytenderdobalanceview";
export const TR_DAILY_PUBLISH = "trDailypublish";
export const QRY_TR_DAILY_BALANCE = "qrytrdailybalance";
export const TRADING_APP_ERRORS = "trading_app_errors";
/*** Queries Required ***/
export const QRY_TENDER_DO_BALANCE_VIEW_RAW = "qrytenderdobalanceviewraw";
export const QRY_TENDER_HEAD = "qrytenderhead";
export const QRY_MST_ACCOUNT_MASTER = "qrymstaccountmaster";
export const QRY_ITEM_MASTER = "qryItemMaster";
export const TR_ORDER_BOOK = "trorderbook";

// create queries
const CREATE_ONLINE_USER_DETAILS = `CREATE TABLE [dbo].[onlineUserDetails](
  [userId] [nvarchar](100) NOT NULL,
  [company_name] [nvarchar](1000) NULL DEFAULT NULL,
  [email] [nvarchar](100) NULL DEFAULT NULL,
  [address] [nvarchar](250) NULL DEFAULT NULL,
  [state] [nvarchar](50) NULL DEFAULT NULL,
  [district] [nvarchar](50) NULL DEFAULT NULL,
  [pincode] [int] NULL DEFAULT NULL,
  [mobile] [nvarchar](15) NULL DEFAULT NULL,
  [whatsapp] [nvarchar](15) NULL DEFAULT NULL,
  [gst] [nvarchar](50) NULL DEFAULT NULL,
  [pan] [nvarchar](20) NULL DEFAULT NULL,
  [fssai] [nvarchar](50) NULL DEFAULT NULL,
  [tan] [nvarchar](50) NULL DEFAULT NULL,
  [constitution_of_firm] [nvarchar](50) NULL DEFAULT NULL,
  [password] [nvarchar](200) NULL DEFAULT NULL,
  [authorized] [smallint] NULL DEFAULT 0,
  [accoid] [int] NULL DEFAULT NULL,
PRIMARY KEY CLUSTERED
(
  [userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]`;

const CREATE_USER_BANK_DETAILS = `CREATE TABLE [dbo].[userBankDetails](
  [userId] [nvarchar](100) NULL DEFAULT NULL,
  [account_name] [nvarchar](100) NULL DEFAULT NULL,
  [account_number] [nvarchar](20) NULL DEFAULT NULL,
  [account_type] [nvarchar](50) NULL DEFAULT NULL,
  [bank_name] [nvarchar](50) NULL DEFAULT NULL,
  [branch] [nvarchar](50) NULL DEFAULT NULL,
  [ifsc] [nvarchar](20) NULL DEFAULT NULL
) ON [PRIMARY]`;

const CREATE_USER_CONTACT_DETAILS = `CREATE TABLE [dbo].[userContactDetails](
  [userId] [nvarchar] (100) NULL DEFAULT NULL,
  [full_name] [nvarchar](50) NULL DEFAULT NULL,
  [designation] [nvarchar](50) NULL DEFAULT NULL,
  [mobile] [nvarchar](15) NULL DEFAULT NULL,
  [whatsapp] [nvarchar](15) NULL DEFAULT NULL,
  [email] [nvarchar](100) NULL DEFAULT NULL
) ON [PRIMARY]`;

const CREATE_USER_OTP_DETAILS = `CREATE table [dbo].[userOTPDetails](
  userId nvarchar (100) PRIMARY KEY,
  otp nvarchar(200),
  create_time bigint,
  delete_time bigint,
)`;

const CREATE_NT_1_ACCOUNTMASTER = `CREATE TABLE [dbo].[nt_1_accountmaster](
  [Ac_Code] [int] NOT NULL,
  [Ac_Name_E] [varchar](255) NULL DEFAULT NULL,
  [Ac_Name_R] [nvarchar](255) NULL DEFAULT NULL,
  [Ac_type] [varchar](5) NULL DEFAULT NULL,
  [Ac_rate] [decimal](18, 2) NULL DEFAULT NULL,
  [Address_E] [varchar](255) NULL DEFAULT NULL,
  [Address_R] [varchar](255) NULL DEFAULT NULL,
  [City_Code] [int] NULL DEFAULT NULL,
  [Pincode] [varchar](10) NULL DEFAULT NULL,
  [Local_Lic_No] [varchar](255) NULL DEFAULT NULL,
  [Tin_No] [varchar](255) NULL DEFAULT NULL,
  [Cst_no] [varchar](255) NULL DEFAULT NULL,
  [Gst_No] [varchar](255) NULL DEFAULT NULL,
  [Email_Id] [varchar](255) NULL DEFAULT NULL,
  [Email_Id_cc] [varchar](255) NULL DEFAULT NULL,
  [Other_Narration] [varchar](1000) NULL DEFAULT NULL,
  [ECC_No] [varchar](255) NULL DEFAULT NULL,
  [Bank_Name] [varchar](255) NULL DEFAULT NULL,
  [Bank_Ac_No] [varchar](255) NULL DEFAULT NULL,
  [Bank_Opening] [decimal](18, 2) NULL DEFAULT NULL,
  [bank_Op_Drcr] [char](1) NULL DEFAULT NULL,
  [Opening_Balance] [decimal](18, 2) NULL DEFAULT NULL,
  [Drcr] [char](1) NULL DEFAULT NULL,
  [Group_Code] [int] NULL DEFAULT NULL,
  [Created_By] [varchar](255) NULL DEFAULT NULL,
  [Modified_By] [varchar](255) NULL DEFAULT NULL,
  [Short_Name] [varchar](50) NULL DEFAULT NULL,
  [Commission] [numeric](18, 2) NULL DEFAULT NULL,
  [carporate_party] [varchar](1) NULL DEFAULT NULL,
  [referBy] [varchar](100) NULL DEFAULT NULL,
  [OffPhone] [varchar](500) NULL DEFAULT NULL,
  [Fax] [varchar](500) NULL DEFAULT NULL,
  [CompanyPan] [varchar](500) NULL DEFAULT NULL,
  [AC_Pan] [nvarchar](max) NULL DEFAULT NULL,
  [Mobile_No] [varchar](50) NULL DEFAULT NULL,
  [Is_Login] [varchar](1) NULL DEFAULT NULL,
  [IFSC] [varchar](50) NULL DEFAULT NULL,
  [FSSAI] [varchar](50) NULL DEFAULT NULL,
  [Branch1OB] [decimal](18, 2) NULL DEFAULT NULL,
  [Branch2OB] [decimal](18, 2) NULL DEFAULT NULL,
  [Branch1Drcr] [char](1) NULL DEFAULT NULL,
  [Branch2Drcr] [char](1) NULL DEFAULT NULL,
  [Locked] [bit] NULL DEFAULT NULL,
  [GSTStateCode] [int] NULL DEFAULT NULL,
  [UnregisterGST] [bit] NULL DEFAULT NULL,
  [Distance] [decimal](18, 2) NULL DEFAULT NULL,
  [Bal_Limit] [decimal](18, 2) NULL DEFAULT NULL,
  [accoid] [int] IDENTITY(1,1) NOT NULL,
  [bsid] [int] NULL DEFAULT NULL,
  [cityid] [int] NULL DEFAULT NULL,
  [whatsup_no] [varchar](45) NULL DEFAULT NULL,
  [company_code] [int] NULL DEFAULT NULL,
  [adhar_no] [varchar](20) NULL DEFAULT NULL,
  [Limit_By] [varchar](2) NULL DEFAULT NULL,
  [Tan_no] [nchar](100) NULL DEFAULT NULL,
  [TDSApplicable] [char](1) NULL DEFAULT NULL,
  [PanLink] [nvarchar](500) NULL DEFAULT NULL,
  [Insurance] [numeric](18, 2) NULL DEFAULT NULL,
  [MsOms] [char](1) NULL DEFAULT NULL,
  [userId] [nvarchar](100) NULL DEFAULT NULL DEFAULT NULL DEFAULT NULL,
 CONSTRAINT [PK_nt_1_accountmaster] PRIMARY KEY CLUSTERED 
(
  [accoid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]`;

const CREATE_TR_DAILY_PUBLISH = `CREATE TABLE [dbo].[trDailypublish](
  [tender_no] [int] NULL,
  [tenderid] [int] NULL,
  [tender_date] [date] NULL,
  [publish_date] [date] NULL,
  [lifting_date] [date] NULL,
  [mill_code] [int] NULL,
  [mc] [int] NULL,
  [item_code] [int] NULL,
  [it] [int] NULL,
  [payment_to] [int] NULL,
  [pt] [int] NULL,
  [doac] [int] NULL,
  [doid] [int] NULL,
  [season] [nvarchar](50) NULL,
  [grade] [nvarchar](50) NULL,
  [unit] [char](1) NULL,
  [qty] [numeric](18, 2) NULL,
  [mill_rate] [numeric](18, 2) NULL,
  [purc_rate] [numeric](18, 2) NULL,
  [sale_rate] [numeric](18, 2) NULL,
  [published_qty] [numeric](18, 2) NULL,
  [selling_type] [nchar](1) NULL,
  [multipal_of] [int] NULL,
  [auto_confirm] [char](1) NULL,
  [status] [char](1) NULL,
  [autoid] [int] IDENTITY(1,1) NOT NULL
) ON [PRIMARY]`;

const CREATE_QRY_TENDER_DO_BALANCE_VIEW = `CREATE VIEW [dbo].[qrytenderdobalanceview]
AS
SELECT dbo.qrytenderdobalanceviewraw.DESPATCH, dbo.qrytenderdobalanceviewraw.BALANCE, dbo.qrytenderdobalanceviewraw.tenderid, dbo.qrytenderdobalanceviewraw.tenderdetailid, dbo.qrytenderdobalanceviewraw.Buyer, 
  dbo.qrytenderdobalanceviewraw.Buyer_Party, dbo.qrytenderdobalanceviewraw.Buyer_Quantal, dbo.qrytenderdobalanceviewraw.Sale_Rate, dbo.qrytenderdobalanceviewraw.buyerid, 
  dbo.qrytenderdobalanceviewraw.buyerpartyid, dbo.qrytenderhead.Tender_No, dbo.qrytenderhead.Company_Code, dbo.qrytenderhead.Year_Code, dbo.qrytenderhead.Mill_Code, dbo.qrytenderhead.mc, 
  dbo.qrytenderhead.Mill_Rate, dbo.qrytenderhead.millshortname, dbo.qrytenderhead.Tender_Date, qrybuyer.Ac_Name_E AS buyername, qrybuyerparty.Ac_Name_E AS buyerpartyname, 
  dbo.qrytenderhead.Tender_DateConverted, dbo.qrytenderhead.Grade, dbo.qrytenderhead.tenderdoname, dbo.qrytenderhead.Lifting_Date, dbo.qrytenderhead.Lifting_DateConverted, dbo.qrytenderdobalanceviewraw.ID, 
  dbo.qrytenderhead.Purc_Rate, dbo.qrytenderhead.tenderdoshortname, dbo.qrytenderhead.Quantal, qrybuyer.cityname, dbo.qrytenderdobalanceviewraw.Commission_Rate, dbo.qrytenderdobalanceviewraw.Delivery_Type, 
  dbo.qrytenderdobalanceviewraw.shiptoname, dbo.qrytenderhead.season, dbo.qrytenderhead.Party_Bill_Rate, dbo.qrytenderhead.millname, dbo.qrytenderhead.paymenttoname, dbo.qrytenderhead.paymenttoshortname, 
  dbo.qrytenderhead.itemcode, dbo.qrytenderhead.itemname, dbo.qrytenderhead.ic, dbo.qrytenderhead.pt, dbo.qrytenderhead.Payment_To, dbo.qrytenderhead.td, dbo.qrytenderhead.Tender_DO
FROM 
  dbo.qrytenderdobalanceviewraw LEFT OUTER JOIN
  dbo.qrymstaccountmaster AS qrybuyerparty ON dbo.qrytenderdobalanceviewraw.buyerpartyid = qrybuyerparty.accoid LEFT OUTER JOIN
  dbo.qrymstaccountmaster AS qrybuyer ON dbo.qrytenderdobalanceviewraw.buyerid = qrybuyer.accoid LEFT OUTER JOIN
  dbo.qrytenderhead ON dbo.qrytenderdobalanceviewraw.tenderid = dbo.qrytenderhead.tenderid`;

const CREATE_QRY_TR_DAILY_BALANCE = `CREATE VIEW [dbo].[qrytrdailybalance]
AS
SELECT dbo.trDailypublish.tender_no, dbo.trDailypublish.tenderid, dbo.trDailypublish.tender_date, dbo.trDailypublish.published_qty, dbo.trDailypublish.publish_date, dbo.trDailypublish.lifting_date, dbo.trDailypublish.mill_code, 
  dbo.trDailypublish.mc, dbo.trDailypublish.payment_to, dbo.trDailypublish.item_code, dbo.trDailypublish.it, dbo.trDailypublish.pt, dbo.trDailypublish.doac, dbo.trDailypublish.doid, dbo.trDailypublish.season, 
  dbo.trDailypublish.grade, dbo.trDailypublish.unit, dbo.trDailypublish.qty, dbo.trDailypublish.mill_rate, dbo.trDailypublish.sale_rate, dbo.trDailypublish.purc_rate, dbo.trDailypublish.selling_type, dbo.trDailypublish.multipal_of, 
  dbo.trDailypublish.auto_confirm, dbo.trDailypublish.status, dbo.trDailypublish.autoid, mill.Ac_Name_E AS millshortname, dbo.qryItemMaster.System_Name_E AS itemname, pt.Short_Name AS paymenttoshortname, 
  tdo.Short_Name AS tenderdoshortname, ISNULL(SUM(dbo.trorderbook.qty), 0) AS sold, dbo.trDailypublish.published_qty - ISNULL(SUM(dbo.trorderbook.qty), 0) AS balance
FROM dbo.trDailypublish LEFT OUTER JOIN
  dbo.nt_1_accountmaster AS tdo ON dbo.trDailypublish.doac = tdo.accoid LEFT OUTER JOIN
  dbo.nt_1_accountmaster AS pt ON dbo.trDailypublish.pt = pt.accoid LEFT OUTER JOIN
  dbo.nt_1_accountmaster AS mill ON dbo.trDailypublish.mc = mill.accoid LEFT OUTER JOIN
  dbo.qryItemMaster ON dbo.trDailypublish.item_code = dbo.qryItemMaster.System_Code LEFT OUTER JOIN
  dbo.trorderbook ON dbo.trDailypublish.tenderid = dbo.trorderbook.tenderid AND dbo.trDailypublish.publish_date = dbo.trorderbook.order_date
GROUP BY dbo.trDailypublish.tender_no, dbo.trDailypublish.tenderid, dbo.trDailypublish.tender_date, dbo.trDailypublish.published_qty, dbo.trDailypublish.publish_date, dbo.trDailypublish.lifting_date, dbo.trDailypublish.mill_code, 
  dbo.trDailypublish.mc, dbo.trDailypublish.payment_to, dbo.trDailypublish.item_code, dbo.trDailypublish.it, dbo.trDailypublish.pt, dbo.trDailypublish.doac, dbo.trDailypublish.doid, dbo.trDailypublish.season, 
  dbo.trDailypublish.grade, dbo.trDailypublish.unit, dbo.trDailypublish.qty, dbo.trDailypublish.mill_rate, dbo.trDailypublish.sale_rate, dbo.trDailypublish.purc_rate, dbo.trDailypublish.selling_type, dbo.trDailypublish.multipal_of, 
  dbo.trDailypublish.auto_confirm, dbo.trDailypublish.status, dbo.trDailypublish.autoid, mill.Ac_Name_E, dbo.qryItemMaster.System_Name_E, pt.Short_Name, tdo.Short_Name`;

const CREATE_TRADING_APP_ERRORS = `CREATE table trading_app_errors(
  id int IDENTITY(1, 1) PRIMARY KEY,
  error_from nvarchar(10),
  error nvarchar(4000),
  error_time bigint
)`;

const CREATE_QRY_TENDER_DO_BALANCE_VIEW_RAW = null;
const CREATE_QRY_TENDER_HEAD = null;
const CREATE_QRY_MST_ACCOUNT_MASTER = null;
const CREATE_QRY_ITEM_MASTER = null;
const CREATE_TR_ORDER_BOOK = null;

export async function checkExistsInDb(name, isView = false) {
  const exist_map = {
    table: `IF EXISTS (SELECT 1 FROM sys.Tables WHERE NAME='${name}')
    SELECT 1 AS res ELSE SELECT 0 AS res;`,
    view: `IF EXISTS (SELECT 1 FROM sys.views WHERE NAME='${name}')
    SELECT 1 AS res ELSE SELECT 0 AS res;`,
  };
  const exists = await (
    await executeQuery(!isView ? exist_map.table : exist_map.view, false)
  )[0].res;
  return exists == "1";
}

let create_table_map = new Map(
  Object.entries({
    [ONLINE_USER_DETAILS]: new Map(
      Object.entries({
        table: ONLINE_USER_DETAILS,
        view: null,
        create: CREATE_ONLINE_USER_DETAILS,
      })
    ),
    [USER_BANK_DETAILS]: new Map(
      Object.entries({
        table: USER_BANK_DETAILS,
        view: null,
        create: CREATE_USER_BANK_DETAILS,
      })
    ),
    [USER_CONTACT_DETAILS]: new Map(
      Object.entries({
        table: USER_CONTACT_DETAILS,
        view: null,
        create: CREATE_USER_CONTACT_DETAILS,
      })
    ),
    [USER_OTP_DETAILS]: new Map(
      Object.entries({
        table: USER_OTP_DETAILS,
        view: null,
        create: CREATE_USER_OTP_DETAILS,
      })
    ),
    [NT_1_ACCOUNTMASTER]: new Map(
      Object.entries({
        table: NT_1_ACCOUNTMASTER,
        view: null,
        create: CREATE_NT_1_ACCOUNTMASTER,
      })
    ),
    [TR_DAILY_PUBLISH]: new Map(
      Object.entries({
        table: TR_DAILY_PUBLISH,
        view: null,
        create: CREATE_TR_DAILY_PUBLISH,
      })
    ),
    [QRY_TENDER_DO_BALANCE_VIEW]: new Map(
      Object.entries({
        table: null,
        view: new Map(
          Object.entries({
            name: QRY_TENDER_DO_BALANCE_VIEW,
            tables: [QRY_TENDER_HEAD, QRY_MST_ACCOUNT_MASTER],
            views: [QRY_TENDER_DO_BALANCE_VIEW_RAW],
          })
        ),
        create: CREATE_QRY_TENDER_DO_BALANCE_VIEW,
      })
    ),
    [QRY_TR_DAILY_BALANCE]: new Map(
      Object.entries({
        table: null,
        view: new Map(
          Object.entries({
            name: QRY_TR_DAILY_BALANCE,
            tables: [
              TR_DAILY_PUBLISH,
              NT_1_ACCOUNTMASTER,
              TR_ORDER_BOOK,
              QRY_ITEM_MASTER,
            ],
            views: [],
          })
        ),
        create: CREATE_QRY_TR_DAILY_BALANCE,
      })
    ),
    [TRADING_APP_ERRORS]: new Map(
      Object.entries({
        table: TRADING_APP_ERRORS,
        view: null,
        create: CREATE_TRADING_APP_ERRORS,
      })
    ),
    [QRY_TENDER_DO_BALANCE_VIEW_RAW]: new Map(
      Object.entries({
        table: null,
        view: new Map(
          Object.entries({
            name: QRY_TENDER_DO_BALANCE_VIEW_RAW,
            tables: [],
            views: [],
          })
        ),
        create: CREATE_QRY_TENDER_DO_BALANCE_VIEW_RAW,
      })
    ),
    [QRY_TENDER_HEAD]: new Map(
      Object.entries({
        table: QRY_TENDER_HEAD,
        view: null,
        create: CREATE_QRY_TENDER_HEAD,
      })
    ),
    [QRY_MST_ACCOUNT_MASTER]: new Map(
      Object.entries({
        table: QRY_MST_ACCOUNT_MASTER,
        view: null,
        create: CREATE_QRY_MST_ACCOUNT_MASTER,
      })
    ),
    [QRY_ITEM_MASTER]: new Map(
      Object.entries({
        table: QRY_ITEM_MASTER,
        view: null,
        create: CREATE_QRY_ITEM_MASTER,
      })
    ),
    [TR_ORDER_BOOK]: new Map(
      Object.entries({
        table: TR_ORDER_BOOK,
        view: null,
        create: CREATE_TR_ORDER_BOOK,
      })
    ),
  })
);

async function createView(view_name) {
  try {
    if (await checkExistsInDb(view_name, true)) {
      return true;
    }
    const curr_view = create_table_map.get(view_name).get("view");
    const views_created = await Promise.all(
      curr_view.get("views").map(async (req_view) => {
        const isCreated = await createView(req_view);
        return { [req_view]: isCreated };
      })
    );
    const tables_created = curr_view.get("tables").map(async (req_table) => {
      const isCreated = await createTable(req_table);
      return { [req_table]: isCreated };
    });
    if (
      Object.values(views_created).includes(false) ||
      Object.values(tables_created).includes(false)
    ) {
      logger.error(`Couldn't create view ${view_name}`);
      return false;
    }

    if (curr_view.get("create") === null) {
      logger.info(`create query doesn't exist for ${view_name}`);
      return false;
    }
    await executeQuery(curr_view.get("create"), false);
    logger.info(`Created view ${view_name}`);
    return true;
  } catch (err) {
    logger.error(`Failed to create ${view_name}`);
    return false;
  }
}

async function createTable(table_name) {
  try {
    if (await checkExistsInDb(table_name)) {
      return true;
    }
    const table = create_table_map.get(table_name);
    if (table.get("create") === null) {
      logger.error(`Create query doesn't exist for ${table_name} `);
      return false;
    }
    await executeQuery(table.get("create"), false);
    return true;
  } catch (err) {
    logger.error(`Failed to create`);
    return false;
  }
}

export async function createRequiredTablesAndViews() {
  let start = Date.now();
  try {
    let create_table_mapKeys = [];
    let failed_to_create = false;
    for (let key of create_table_map.keys()) {
      create_table_mapKeys.push(key);
    }
    const all_create_output = await Promise.all(
      create_table_mapKeys.map(async (table_or_view) => {
        const isView = create_table_map.get(table_or_view).get("view") != null;
        const isCreated = isView
          ? await createView(table_or_view)
          : await createTable(table_or_view);
        if (!isCreated) {
          failed_to_create = true;
        }
        return { [table_or_view]: isCreated };
      })
    );
    failed_to_create && logger.info(all_create_output);
    logger.info("All schema created in - " + (Date.now() - start) + " ms");
  } catch (err) {
    logger.error(err);
    logger.info("All schema created in - " + (Date.now() - start) + " ms");
  }
}
