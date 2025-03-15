import Joi from "joi";


export const addwishlistValidator = Joi.object({
    name: Joi.string().max(90).required(),
    price: Joi.number().min(0).required(),
    storeLink: Joi.string().uri().required(),
});