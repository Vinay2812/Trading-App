import { getUser } from "../../api/AuthRequest";

const alphabetRegex = /^[A-Za-z\s]+$/
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/

export default function validateForm({ userData, bankData, contactData }, setError) {
    async function validateUserData() {
        const { company_name, email, state, district, pincode, mobile, gst, pan, constitution_of_firm } = userData;
        
        if (!alphabetRegex.test(company_name)) {
            setError("Invalid company name");
            return false;
        }

        if (!emailRegex.test(email)) {
            setError("Invalid email");
            return false;
        }

        if (!state.length) {
            setError("Please select state");
            return false;
        }

        if (!district.length) {
            setError("Please select district");
            return false;
        }

        if ((pincode.length !== 6)) {
            setError("Invalid pincode");
            return false;
        }

        if (mobile.length < 10) {
            setError("Invalid phone number");
            return false;
        }
        try {
            const data = {
                company_name, mobile: mobile.substring(mobile.length - 10, mobile.length)
            }
            const res = await getUser(data);
            if(res.status == 400){
                setError(res.data);
                return;
            }
        } catch (err) {
            setError(err);
            return;
        }
        if (pan.length !== 10) {
            setError("Invalid Pan");
            return false;
        }

        if (gst.length && gst.length !== 15) {
            setError("Invalid gst")
            return false;
        }

        if (gst.length === 15 && gst.substring(3, 13) !== pan) {
            setError("Invalid pan");
            return false;
        }

        if (!constitution_of_firm.length) {
            setError("Please select constitution of the firm");
            return false;
        }

        return true;
    }
    function validateBankData() {
        for (let data of bankData) {
            const { account_name, account_number, account_type, bank_name, branch, ifsc } = data;
            if (!account_name.length || /^\d/.test(account_name)) {
                setError("Enter valid account name in Bank Detail " + data.id);
                return false;
            }

            if (!account_number.length || !/^\d/.test(account_number)) {
                setError("Enter valid account number in Bank Detail " + data.id);
                return false;
            }

            if (!account_type.length) {
                setError("Please select account type in Bank Detail " + data.id);
                return false;
            }

            if (!bank_name.length) {
                setError("Enter valid bank name in Bank Detail " + data.id);
                return false;
            }

            if (!branch.length) {
                setError("Enter valid branch in Bank Detail " + data.id)
                return false;
            }

            if (!ifsc.length) {
                setError("Enter valid ifsc code in Bank Detail " + data.id);
                return false;
            }

        }
        return true;
    }
    function validateContactData() {
        for (let data of contactData) {
            const { full_name, designation, mobile, email } = data;

            if (!(full_name.indexOf(' '))) {
                setError("Please enter full name in Contact " + data.id);
                return false;
            }

            if (!designation.length) {
                setError("Enter designation in Contact " + data.id)
                return false;
            }

            if (!mobile.length) {
                setError("Enter mobile number in Contact " + data.id);
                return false;
            }

            if (!emailRegex.test(email)) {
                setError("Enter valid email in Contact " + data.id);
                return false;
            }

        }
        return true;
    }

    return validateUserData() && validateBankData() && validateContactData();

}


