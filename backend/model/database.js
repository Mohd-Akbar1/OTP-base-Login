const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null }
},{timestamps:true})






const User=new mongoose.model('User',UserSchema)


module.exports={User}