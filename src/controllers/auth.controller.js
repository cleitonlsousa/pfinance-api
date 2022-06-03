import { User } from "../models/user.js";
import { generateToken } from '../utils/tokenManager.js';

export const login = async(req,res) => {

    try {
        const {email, password} = req.body;
        
        let user = await User.findOne({email});
        
        if(!user) return res.status(403).json({error: "Usuário/Senha inválidos"})

        if(!(await user.comparePassword(password)))
            return res.status(403).json({error: "Usuário/Senha inválidos"})

        const {token, expiresIn} = generateToken(user.id);

        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error);    
        return res.status(500).json({error: 'Server error'})
    }  
};

export const infoToken = async(req, res) => {
    try {
        const user = await User.findById(req.uid) 
        return res.json({user});    
    } catch (error) {
        console.log(error)
    }
    
    
}