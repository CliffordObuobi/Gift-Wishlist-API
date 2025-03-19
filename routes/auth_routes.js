import express from 'express';

import { loginSchema, registerSchema } from '../validators/user_validation.js';


const router = express.Router();

router.post ('/register', async (req,res) => {
    const {error, value} = registerSchema.validate(req.body);
},);

router.post('/login', async (req,res) => {
    const { error, value} = loginSchema.validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message });
});

export default router;