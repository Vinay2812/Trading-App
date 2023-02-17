SELECT * from onlineUserDetails;

SELECT * from userContactDetails;

SELECT * from userBankDetails;

SELECT * from userOTPDetails;

SELECT * from nt_1_accountmaster WHERE company_code = 1;

SELECT Tender_No, Tender_Date, millshortname, itemname, 
paymenttoshortname, tenderdoshortname, season, Grade, 
Quantal, Lifting_Date, Purc_Rate, Mill_Rate, mc, pt, itemcode, 
tenderid, td from qrytenderdobalanceview WHERE balance > 0 AND Buyer_Party = 2
