const joi=require('@hapi/joi')


const Register=(data)=>{

    const schema=joi.object({
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    }
    )
    

    return schema.validate(data)
}

const Login=(data)=>{

    const schema=joi.object({
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    }
    )
    

    return schema.validate(data)
}
module.exports.Register=Register;
module.exports.Login=Login;