import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req,res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user || user.password !== password) {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};