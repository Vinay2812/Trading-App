SELECT * from onlineUserDetails;

SELECT * from userContactDetails;

SELECT * from userBankDetails;

SELECT * from userOTPDetails;

SELECT * from nt_1_accountmaster WHERE company_code = 1;

SELECT * from qrytenderdobalanceview WHERE balance > 0 AND Buyer_Party = 2
SELECT Tender_No, Tender_Date, millshortname, itemname, 
paymenttoshortname, tenderdoshortname, season, Grade, 
Quantal, Lifting_Date, Purc_Rate, Mill_Rate, mc, pt, itemcode, 
tenderid, td, BALANCE as balance from qrytenderdobalanceview WHERE balance > 0 AND Buyer_Party = 2

SELECT * from trDailypublish;
SELECT tender_no, tenderid, tender_date, publish_date, 
    lifting_date, mill_code, mc, item_code, it, payment_to, 
    pt, doac, doid, season, grade, unit, qty, mill_rate, 
    purc_rate, sale_rate, published_qty, selling_type, multipal_of
    , auto_confirm, status
 from trDailypublish;


