const jwt=require('jsonwebtoken')
//middelware to protect a certain routes
const authuser=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        const validate=jwt.verify(token,process.env.TOKEN_SECRET)
        if(!validate){
            return res.send('you should log in')
        }else{
            console.log('you loged in with the right json web token')
            next()
        }
    }else{
       return res.send('you should log in')
    }

}
module.exports.authuser=authuser;