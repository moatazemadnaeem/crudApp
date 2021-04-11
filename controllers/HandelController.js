const mongoose=require('mongoose')
const user=require('../models/schema')
const {Register,Login}=require('../validation')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
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
    postRigester:async(req,res)=>{
        let person=req.body;
        try{
            const userdata=await user.findOne({email:person.email})
            if(userdata){
               return res.send('The email is already taken')
            }
        }catch(err){
            return res.send(err)
        }
        const {error}=Register(person)

        if(error){
          return  res.status(400).send(error.details[0].message)
        }
      
            const salt=await bcrypt.genSalt()
            person.password=await bcrypt.hash(person.password,salt)
            user.create(person,(err,resp)=>{
                if(err){
                  return  res.send(err)
                }
                else{
                  return  res.send(resp)
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
            resp.name=newdata.name?newdata.name: resp.name;
            resp.email=newdata.email?newdata.email:resp.email;
            resp.password=newdata.password?newdata.password:resp.password;
            resp.save();
            res.json(resp)
        }
       })
       
       
    },
    postLogin:async(req,res)=>{
        let person=req.body;
        console.log(person)
        const {error}=Login(person)
        if(error){
          return  res.status(400).send(error.details[0].message)
        }
        try{
            const userdata=await user.findOne({email:person.email})
            if(!userdata){
               return res.send('The email is not exist')
            }
            else{
                const validate=bcrypt.compare(person.password,userdata.password)
                if(!validate){
                    return res.send('Invalid password')
                }
                else{
                    //json web token code go here because we loged in successfully
                    const token=jwt.sign({id:userdata._id},process.env.TOKEN_SECRET,{expiresIn:60*60*24*3})//this expires in 3 days
                    console.log(token)
                    res.cookie('jwt',token,{maxAge:1000*60*60*24*3})//this expires in 3 days 
                    return res.send(`Loged in successfully ${token}`)
                }
            }
        }catch(err){
           return res.send(err)
        }
       
        
      
    },
    Logout:(req,res)=>{
      res.clearCookie('jwt')
      res.send('cookie was deleted')
    }
}