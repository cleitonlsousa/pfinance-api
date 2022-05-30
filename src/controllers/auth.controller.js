import { User } from "../models/user.js";

export const register = async(req,res) => { 
    const {name, email, password, groups} = req.body;

    try {
        const user = new User({name, email, password, groups});
        await user.save();
        return res.status(201).json({ok: true})
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: 'E-mail já utilizado'})
        }
        return res.status(500).json({error: 'Server error'})
    }
};

export const addGroup = async(req,res) => { 
    const {user_id, group_id} = req.body;

    try {
        let user = await User.findById(user_id);
        user.groups.push({group_id});
        await user.save();
        return res.status(201).json({ok: true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'})
    }
};

export const login = async(req,res) => {
    console.log(req.body);
    res.json({ok : 'login'});
};