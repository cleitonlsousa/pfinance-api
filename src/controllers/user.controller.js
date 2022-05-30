import { User } from "../models/user.js";

export const create = async(req,res) => { 
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

export const update = async (req, res) => {
    try {
        
        let { name, email } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        user.name = (name) ? name : user.name;
        user.email = (email) ? email : user.email;

        await user.save();

        return res.json({ id: user.id, name: user.name, email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const addGroup = async(req,res) => { 
    const {user_id, group_id} = req.body;

    try {
      const response = await addGroupId(user_id, group_id);
      return res.status(response.code).json({message: response.message});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message})
    }
}

export const addGroupId = async(user_id, group_id) => {
        
    let user = await User.findById(user_id);

    if(!user) return ({code: 400, message: 'usuário não encontrado'});
    
    if(user.groups.includes(group_id)) return ({code: 400, message: 'Usuário já inserido nesse grupo'});

    if(user.groups && user.groups.length > 0){
        user.groups.push(group_id);
    }else {
        user.groups = [group_id]
    }
        
    await user.save();
    return ({code: 200, message: 'sucesso'});
    
};

export const removeGroup = async(req,res) => { 
    const {user_id, group_id} = req.body;

    try {
        const response = await removeGroupId(user_id, group_id);
        return res.status(response.code).json({message: response.message});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message})
    }
};

export const removeGroupId = async(user_id, group_id) => {
        
    let user = await User.findById(user_id);

    if(!user) return ({code: 400, message: 'usuário não encontrado'});

    const index = user.groups.indexOf(group_id);
    if (index > -1) {
        user.groups.splice(index, 1);
    }
    
    await user.save();
    return ({code: 200, message: 'sucesso'});
};