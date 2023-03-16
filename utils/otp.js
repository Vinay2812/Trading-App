import { OTP_LENGTH } from "./config.js";

export default function genereateOTP() {
  let otp = [];
  for(let i = 0; i < OTP_LENGTH; i++){
    otp.push(Math.floor(Math.random() * 10))
  }
  otp = otp.join("");
  return otp;
}
