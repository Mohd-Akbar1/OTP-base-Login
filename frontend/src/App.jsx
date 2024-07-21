import { useState } from 'react'
import Confetti from 'react-confetti'
import './App.css'
import Login from './assets/Auth/Login'
import Register from './assets/Auth/Reg'
import toast, { Toaster } from 'react-hot-toast';
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import Home from './assets/Auth/Home'
import OTP from './assets/Auth/OTP'
import PrivateRoute from './assets/Auth/PrivateRoute'

function App() {
const status=localStorage.getItem('status')
const email =localStorage.getItem('email') 
console.log()
  return (
  
  <>
   
     <BrowserRouter>
     <Toaster/> 
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reg' element={<Register/>} />
        <Route path='/otp' element={email? <OTP/>: <Login/>} />
        <Route path='/otp/home' element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        } />
       
        


      </Routes>
      </BrowserRouter>
  
  </>
      
   
   
  )
}

export default App
