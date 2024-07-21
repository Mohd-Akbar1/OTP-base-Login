

const nodemailer=require('nodemailer')


async function sendMail(OTP,email){
 

    const transpoter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'34mohdakbar@gmail.com',
            pass:process.env.EMAIL
        }
    })
   

    const mailOptions={
        from:'34mohdakbar@gmail.com',
        to:email,
        subject:'OTP for Login as a user',
        text:`Your OTP code is ${OTP}. It is valid for 5 minutes.`
    }
    //send the  email
    try{
        const result=await transpoter.sendMail(mailOptions)
        console.log('email sucessfully sent to',email)
    }catch(err){
        console.log('error in email',err)
    }
}

module.exports={sendMail}