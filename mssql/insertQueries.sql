INSERT into onlineUserDetails (email) OUTPUT inserted.* VALUES ('vinaysarda2812@gmail.com')

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
                '88262', 'lata software consultancy', 'lata software consultancy', 'P', '627 swapnapurti apeartment
pui khadi', 
                '627 swapnapurti apeartment
pui khadi', '416012', '', 'netramarda2001@gmail.com', 'Online', 
                'icici', '654546576456','D', 'D', 'netr',
                'N', '8970076865', '9021985040', 'Y', '4632874683264', 
                '56476578346', 'D', 'D', '0', '22',
                '1', '8978664537', 'N', '', 'Y',
                'M',
                '0', '0', '0', '0',
                '0', '0', '0', '0', '0', '0',
                '0', '0', '0', '1'

            )


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
    '2459', '2503', '02/08/2022', '2/18/2023',
    '05/08/2022', '84482', '5881', '1', '8', '80402',
    '1943', '80402', '1943', '21-22', 'SUPER S/30 (S1)', 'Q', '5000', '3375',
    '0', '12', '1212', 'F', '160',
    'Y', 'Y'
)

