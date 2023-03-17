SELECT *
from onlineUserDetails;

SELECT *
from userContactDetails;

SELECT *
from userBankDetails;

SELECT *
from userOTPDetails;

SELECT *
from nt_1_accountmaster
WHERE company_code = 1;

SELECT *
from qrytenderdobalanceview
WHERE balance > 0 AND Buyer_Party = 2
SELECT Tender_No, Tender_Date, millshortname, itemname,
    paymenttoshortname, tenderdoshortname, season, Grade,
    Quantal, Lifting_Date, Purc_Rate, Mill_Rate, mc, pt, itemcode,
    tenderid, td, BALANCE as balance
from qrytenderdobalanceview
WHERE balance > 0 AND Buyer_Party = 2

SELECT *
from trDailypublish;
SELECT tender_no, tenderid, tender_date, publish_date,
    lifting_date, mill_code, mc, item_code, it, payment_to,
    pt, doac, doid, season, grade, unit, qty, mill_rate,
    purc_rate, sale_rate, published_qty, selling_type, multipal_of
    , auto_confirm, status
from trDailypublish;

/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000)
        [tender_no]
      , [tenderid]
      , [tender_date]
      , [publish_date]
      , [lifting_date]
      , [mill_code]
      , [mc]
      , [item_code]
      , [it]
      , [payment_to]
      , [pt]
      , [doac]
      , [doid]
      , [season]
      , [grade]
      , [unit]
      , [qty]
      , [mill_rate]
      , [purc_rate]
      , [sale_rate]
      , [published_qty]
      , [selling_type]
      , [multipal_of]
      , [auto_confirm]
      , [status]
      , [autoid]
FROM [sugariandb].[dbo].[trDailypublish]
SELECT *
from qrytrdailybalance
where status ='Y' and balance > 0

-- SELECT * from qrytrdailybalance where status ='Y' and balance > 0


ALTER VIEW qrytrdailybalance
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
                         dbo.trDailypublish.auto_confirm, dbo.trDailypublish.status, dbo.trDailypublish.autoid, mill.Ac_Name_E, dbo.qryItemMaster.System_Name_E, pt.Short_Name, tdo.Short_Name
GO

select * from trading_app_errors
drop table trading_app_errors
drop table userOTPDetails

IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='${table_name}')
      SELECT 1 AS res ELSE SELECT 0 AS res

CREATE table trading_app_errors(
    id int IDENTITY(1, 1) PRIMARY KEY,
    error_from nvarchar(10),
    error nvarchar(4000),
    error_time bigint
)

CREATE table userOTPDetails(
    userId int PRIMARY KEY,
    otp nvarchar(200),
    create_time bigint,
    delete_time bigint,
)

SELECT * from userOTPDetails

DELETE from userOTPDetails 
OUTPUT deleted.userId
WHERE userId in 
(
    SELECT u1.userId from 
    userOTPDetails u1 INNER JOIN userOTPDetails u2 
    ON u1.userId = u2.userId 
    AND u1.delete_time - u2.create_time  >= 5 * 60 * 1000
)

SELECT * FROM userOTPDetails
WHERE (delete_time) >= 1678997265398 
INSERT into trading_app_errors (error, error_time)
      OUTPUT inserted.*
      VALUES ('{ query : \n SELECT Ac_Name_E, accoid from nt_1_accountmaster \n WHERE company_code = 1 AND userId is null\n ORDER BY Ac_Name_E\n , time : 148ms }', '1678727056275')