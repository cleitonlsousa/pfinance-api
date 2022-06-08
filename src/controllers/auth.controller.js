import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import { generateRefreshToken, generateToken, tokenVerificationError } from '../utils/tokenManager.js';

export const login = async(req,res) => {

    try {
        const {email, password} = req.body;
        
        let user = await User.findOne({email});
        
        if(!user) return res.status(403).json({error: "Usuário/Senha inválidos"})

        if(!(await user.comparePassword(password)))
            return res.status(403).json({error: "Usuário/Senha inválidos"})

        const {token, expiresIn} = generateToken(user.id);
        
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error);    
        return res.status(500).json({error: 'Server error'})
    }  
};

export const infoToken = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean() 
        return res.json({ uid: user._id, email: user.email });    
    } catch (error) {
        console.log(error)
        return res.status(401).send({error: tokenVerificationError[error.message]})
    }
    
    
}

export const refreshToken = async (req, res) => {
    try {
        const {token, expiresIn} = generateToken(uid);
        
        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};