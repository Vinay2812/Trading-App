import crypto from 'crypto';
import { OTP_LENGTH, UNIQUE_ID_LENGTH } from './config.js';

export function getRandomId(){
    const uniqueId = crypto.randomBytes(parseInt(UNIQUE_ID_LENGTH)).toString('hex');
    logger.log(uniqueId);
    return uniqueId;
}

export function getRandomOtp() {
    let otp = [];
    for(let i = 0; i < OTP_LENGTH; i++){
      otp.push(Math.floor(Math.random() * 10))
    }
    otp = otp.join("");
    logger.log(otp);
    return otp;
}