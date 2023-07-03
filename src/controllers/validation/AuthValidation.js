const Joi = require('joi')

const registerValidation = data =>{

    const schema =Joi.object( {
        full_name: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        address: Joi.required(),
        city:Joi.string().required(),
        role_id:Joi.number().required()
    });

    return schema.validate(data)
}

const loginValidation =data=>{

    const schema =Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data)
}

module.exports =  {loginValidation, registerValidation};

