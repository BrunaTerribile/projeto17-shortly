import joi from 'joi';

export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.email().required(),
    password: joi.password().required(),
    confirmPassword: joi.string()
})