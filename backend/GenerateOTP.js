const crypto = require('crypto');
const GenerateOTP=()=>{
    const otp = crypto.randomInt(100000, 999999); 
    return otp
}
module.exports=GenerateOTP