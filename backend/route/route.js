const { UserLogin, UserRegister, verifyOTP, requestOtp } = require('../controller')
const GenerateOTP = require('../GenerateOTP')
const authenticateToken = require('../JWT')
const { User } = require('../model/database')
const { sendMail } = require('../Nodemailer')
const limiter = require('../RateLimiter')

const router=require('express').Router()

router.post('/login',UserLogin)
router.post('/register',UserRegister)


router.post('/verifyotp',authenticateToken,verifyOTP)
router.post('/Resendotp',limiter,authenticateToken,async function(req,res){
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if(user){
        user.otp = null;
      user.otpExpiry = null;
      await user.save();
      const otp = GenerateOTP();
      await sendMail(otp,user.email);
      user.otp=otp
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
      user.otpExpiry=otpExpiry
      user.save() 

      return res.status(200).json({msg:'OTP has been sent Again'})
    }
    return res.json({msg:'User not found'})
    
})
//requestOtp
module.exports=router