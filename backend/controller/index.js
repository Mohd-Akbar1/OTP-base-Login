const { User } = require("../model/database");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto = require('crypto');
const { sendMail } = require("../Nodemailer");
const GenerateOTP = require("../GenerateOTP");



const UserRegister = async (req, res) => {
    const { name, email, password } = req.body.formdata;
    
    
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(203).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword  
          
             
        });

        if (newUser) {
            return res.status(200).json({ msg: 'User account created successfully' });
        }
    } catch (error) {
        console.error('Error occurred in creating account:', error);
    }

    return res.json({ msg: 'Error occurred in creating account' });
}

const UserLogin=async(req,res)=>{

    const {email,password}=req.body.formdata
   
    const user=await User.findOne({email:email})
    
    if(user){
        

    const hashedpassword=await bcrypt.compare(password,user.password)

    if(hashedpassword){
       
       

        // Generating a 6-digit OTP
         requestOtp(email)
         const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '1h' });
        return res.status(200).json({msg:"OTP has been sent your email",email,token})

    }else{
        return res.status(201).json({msg:'email or password mis-matched'})
    }
    }
    return res.status(203).json({msg:"user Doesn't exist"})

    

    


}

const requestOtp= async(email) => {
    try {
        console.log('email',email)
      const otp = GenerateOTP();
    
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
    
      const user = await User.findOneAndUpdate(
        { email },
        { otp, otpExpiry },
        { new: true, upsert: true }
      );
   
      await sendMail(otp,user.email);
      
      
    } catch (error) {
     console.log(error)
    }
  }

const verifyOTP=async(req,res)=>{
  console.log('otp')
    try {
      const { email, otp } = req.body;
      console.log(email,otp)
      const user = await User.findOne({ email });
  
      if (!user || !user.otp || user.otp !== otp || new Date() > user.otpExpiry) {
        return res.status(201).json({ msg: 'Invalid or expired OTP' });
      }

      
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      console.log('true otp')
      res.status(200).json({ msg: 'OTP verified' });
    } catch (error) {
        
      res.status(500).json({ msg: 'Error verifying OTP', error });
    }
  };
  


module.exports={
    UserLogin,
    UserRegister,
    verifyOTP,
    requestOtp
}