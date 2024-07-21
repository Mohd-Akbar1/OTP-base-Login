const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const mongoose=require('mongoose')
const userApi=require('./route/route')

mongoose.connect('mongodb://127.0.0.1/assignment').then(()=>console.log('dbconnected'))


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',userApi)


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({msg:'Something broke!'});
  });



app.listen(8000,function(){
    console.log('Server is running')
})





