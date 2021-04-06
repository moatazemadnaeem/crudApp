const mongoose=require('mongoose')
const user=require('../models/schema')

module.exports={

    get:(req,res)=>{
        user.find({},(err,data)=>{
            if(err){
                res.send(err)
            }
            else{
                console.log(data)
                res.json(data)
            }
            
        })
    
    },
    post:(req,res)=>{
        let person=req.body;
        user.create(person,(err,resp)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send(resp)
            }
        })
       
    },
    delete:(req,res)=>{
        const name=req.params.name;
        user.findOneAndRemove({name},(err,result)=>{

            if(err){
               res.send(err)
            }
            else{
                res.json(result)
            }
        })
       
    },
    put:(req,res)=>{
        const name=req.params.name;
        const newdata=req.body;
       user.findOne({name},(err,resp)=>{

        if(err){
            res.send(err)
        }else{
            resp.name=newdata.name;
            resp.age=newdata.age;
            resp.save();
            res.json(resp)
        }
       })
       
       
    }
}