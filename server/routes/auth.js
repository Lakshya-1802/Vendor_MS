import express from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please enter all the required fields' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        savedUser.password = undefined;
        return res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter all the required fields' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        const passwordMatches = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatches){
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const payload ={uid:existingUser.uid}
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'12h'})
        return res.status(200).json({token})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
});

export default router;
