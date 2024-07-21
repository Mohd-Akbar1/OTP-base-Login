import React from 'react'
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
const Home = () => {
  const navigate=useNavigate()
  const LogoutFunction=()=>{
      toast.success('You have been Logged out')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('status')
      navigate('/')
  }
  return (
    <div>
        <Confetti/>
        <h1>Welcome, you have Logged In</h1>
        <button onClick={LogoutFunction}>Logout</button>
      
    </div>
  )
}

export default Home
