import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import './otp.css'

const OTP = () => {
    const [otp,setotp]=useState(0)
    const navigate=useNavigate()
  let email=localStorage.getItem('email')
  let token=localStorage.getItem('token')
  
    
    function handleOTPclick(e){
      e.preventDefault()

      const fetchdata=async()=>{
        console.log(token)
        const resp=await axios.post('http://localhost:8000/api/verifyotp',{email,otp}, {
          headers: { Authorization: token }})
       
        
        if (resp.status === 200) {
          localStorage.setItem('status',true)
          toast.success(resp.data.msg);
          navigate('/otp/home'); // Navigate to the home route
        } else {
          console.log('hi')
          toast.error(resp.data.msg); // Display error if status is not 200
        }
      }
      fetchdata()
      
        console.log(otp)
    }

  const ResendOtpnew=async()=>{
    try {
      const resp=await axios.post('http://localhost:8000/api/Resendotp',{email},{headers:{ Authorization: token }})
      console.log(resp.data)
      
        toast.success(resp.data.msg)
      
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='otpbox'>
      <h3>Enter the OTP sent on email</h3>
      <input type="number" name="otp" id="otp" onChange={e=>setotp(e.target.value)} />
     <div className="buttons">
     <button onClick={handleOTPclick}>Verify OTP</button>
     <button onClick={ResendOtpnew} >Re-send OTP</button>
     </div>
    </div>
  )
}

export default OTP
