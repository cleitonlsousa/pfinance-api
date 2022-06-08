import { User } from "../models/user.js";

export const create = async(req,res) => { 
    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});
        await user.save();
        return res.status(201).json({message: "created"})
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: 'E-mail já utilizado'})
        }
        return res.status(500).json({error: 'Server error'})
    }
};

export const find = async(req, res) => {
    
}

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