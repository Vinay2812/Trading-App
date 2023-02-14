import { generate } from "otp-generator"
import { config } from "dotenv";
config();

const OTP_CONFIG = {
    upperCaseAlphabets: true,
    specialChars: false,
}

export default function genereateOTP(){
    return generate(process.env.OTP_LENGTH, OTP_CONFIG);
}