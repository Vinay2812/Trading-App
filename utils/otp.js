import { generate } from "otp-generator";
import { OTP_LENGTH } from "./config.js";

const OTP_CONFIG = {
  upperCaseAlphabets: true,
  specialChars: false,
};

export default function genereateOTP() {
  return generate(OTP_LENGTH, OTP_CONFIG);
}
