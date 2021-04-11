const express=require('express')
const routes=require('./routes/HandelRoutes')
const path=require('path')
const mongoose=require('mongoose')
require('dotenv').config()
const cookieParser=require('cookie-parser')
const app=express()
mongoose.connect(`mongodb+srv://Moataz:${process.env.PASSWORD}@cluster0.ke2gb.mongodb.net/TestCrudDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const {authuser}=require('./jwtvalidation')
app.use(express.json())
app.use(cookieParser())
app.use('/router',routes)
app.get('/',authuser,(req,res)=>{
   res.send('hello guys')
})

app.listen(3000)