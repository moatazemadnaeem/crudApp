const express=require('express')
const routes=require('./routes/HandelRoutes')
const path=require('path')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()
mongoose.connect(`mongodb+srv://Moataz:${process.env.PASSWORD}@cluster0.ke2gb.mongodb.net/TestCrudDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
app.use(express.json())
app.use('/router',routes)
app.get('/',(req,res)=>{
   res.send('hello guys')
})

app.listen(3000)