const Joi = require('joi')

const registerValidation = data => {

    const schema = Joi.object({
        full_name: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        address: Joi.required(),
        city: Joi.string().required(),
        role_id: Joi.number().required()
    });

    return schema.validate(data)
}

const loginValidation = data => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data)
}

const addPostValidation = data => {

    const schema = Joi.object({
        post_title: Joi.string().min(4).required(),
        post_image: {
            originalname: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
            size: Joi.number().max(5242880).required()
        },
        post_description: Joi.string().min(10).required(),
        status: Joi.number().required(),
    });

    return schema.validate(data)
}

const editPostValidation = data => {

    const schema = Joi.object({
        post_id: Joi.number().required(),
        post_title: Joi.string().min(4).required(),
        post_image: {
            originalname: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
            size: Joi.number().max(5242880).required()
        },
        post_description: Joi.string().min(10).required(),
        status: Joi.number().required(),
    });

    return schema.validate(data)
}

const deletePostValidation = data => {

    const schema = Joi.object({
        post_id: Joi.number().required(),
    });

    return schema.validate(data)
}
module.exports = { loginValidation, registerValidation, addPostValidation, editPostValidation, deletePostValidation };

