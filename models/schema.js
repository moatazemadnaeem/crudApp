const mongoose =require('mongoose')

const data=new mongoose.Schema({
    name:String,
    age:String
})


module.exports=mongoose.model('userdata',data);