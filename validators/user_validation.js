import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
})

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),

});