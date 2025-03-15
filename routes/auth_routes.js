import express from 'express';
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema } from '../validators/user_validation.js';
import { UserModel } from '../models/user_model.js';

const router = express.Router();

router.post ('/register', async (req,res) => {
    const {error, value} = registerSchema.validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    try {
        const user = new UserModel(value);
        await user.save();
        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({message: err.message});  
    }
});

router.post('/login', async (req,res) => {
    const { error, value} = loginSchema.validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message });

    try {
        const user = await UserModel.findOne({ username: value.username});
        if (!user) return res.status(401).json({message: 'Invalid credentials'});
        const isMatch = await user.comparePassword(value.password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credentials'});
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        res.json({token});
    } catch (error) {
        res.status(500).json({message: err.message});
    }
});

export default router;