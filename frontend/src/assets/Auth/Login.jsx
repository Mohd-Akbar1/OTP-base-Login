import React, { useContext, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'


import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  
  const [formdata,setFormdata]=useState({
    email:'',
    password:''
  })
 
  const navigate=useNavigate()
 

    

 

      

    const handleChange=(e)=>{
      const {name,value}=e.target
      setFormdata({...formdata,[name]:value})
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      const fetchdata=async()=>{
        const response=await axios.post('http://localhost:8000/api/login',{formdata})
        console.log(response.data.email)
        localStorage.setItem('email',response.data.email)
        localStorage.setItem('token',response.data.token)
        toast.success(response.data.msg)
        if(response.status==200){
          navigate('otp')
        }
      }
      fetchdata()
    }


  return (
    <div className='LoginContainer'>
    <div className="headinglogo">
   
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png" alt="" className='loginImage' />
    </div>
       
        <div className="loginform" >
        <h2>Login</h2>
       
     
            <form  onSubmit={handleSubmit} className='formdata' >
                <input type="text" placeholder='Email' name='email'  value={formdata.email} onChange={handleChange} required/>
                <input type="password" placeholder='password' name='password'  value={formdata.password} onChange={handleChange} required/>
                
               
                <button type='submit' className='btn'>Login</button>
               

                <p >create new account    <Link to={'/reg'} style={{textDecoration:'none'}} >click here</Link> </p>
            </form>
            

        </div>
      
    </div>
  )
}

export default Login
