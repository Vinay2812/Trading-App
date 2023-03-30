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

const CREATE_QRY_TENDER_DO_BALANCE_VIEW_RAW = null;
const CREATE_QRY_TENDER_HEAD = null;
const CREATE_QRY_MST_ACCOUNT_MASTER = null;
const CREATE_QRY_ITEM_MASTER = null;
const CREATE_TR_ORDER_BOOK = null;
