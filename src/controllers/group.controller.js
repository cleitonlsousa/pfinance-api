import { Group } from "../models/group.js";
import { addGroupId, removeGroupId } from "../controllers/user.controller.js";

export const create = async(req,res) => { 
    const {name, description, users} = req.body;

    try {
        const group = new Group({name, description, users});
    
        await group.save().then(savedGroup => {
            addGroupToUser(savedGroup._id.toString(), users);
        });

        return res.status(201).json({message: "created"})
    
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error: 'Nome do grupo já utilizado'})
        }
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const update = async (req, res) => {
    try {
        
        let { name, description } = req.body;

        const group = await Group.findById(req.params.id);

        if (!group) return res.status(404).json({ error: "Grupo não encontrado" });

        group.name = (name) ? name : group.name;
        group.description = (description) ? description : group.description;

        await group.save();

        return res.json({ id: group.id, name: group.name, description: group.description});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const find = async(req,res) => { 
    
    try {
        
        const group = await Group.findById(user_id);
        
        return (group) ?  res.json({ group }) : res.status(404).json({ error: "Grupo não encontrado" });
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const remove = async(req,res) => { 
    
    try {
        console.log('aqui')
        const group = await Group.findById(req.params.id);

        if (!group) return res.status(404).json({ error: "Grupo não encontrado" });
       
        await removeGroupToUser(group);
        await group.remove();
        return res.json('grupo removido')
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

const addGroupToUser = async(groupId, users) => {
    for (let i in users) {
        await addGroupId(users[i], groupId);                
    }
}

const removeGroupToUser = async(group) => {
    for (let i in group.users) {
        await removeGroupId(group.users[i], group.id);                
    }
}