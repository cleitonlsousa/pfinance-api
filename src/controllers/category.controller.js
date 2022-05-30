import { Category } from "../models/category.js";

export const create = async(req,res) => { 
    const {name, description, parent} = req.body;

    try {
        const group = new Category({name, description, active: true, parent});
    
        await group.save();

        return res.status(201).json({message: "created"})
    
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error: 'Nome de categoria já utilizado'})
        }
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const update = async (req, res) => {
    try {
        
        const {name, description, parent} = req.body;

        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ error: "Categoria não encontrado" });

        category.name = (name) ? name : category.name;
        category.description = (description) ? description : category.description;
        category.parent = (parent) ? parent : category.parent;

        await category.save();

        return res.json({ id: category.id, name: category.name, description: category.description, parent: category.parent});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const find = async(req,res) => { 
    
    try {
        
        const category = await Category.findById(req.params.id);

        return (category) ?  res.json({ category }) : res.status(404).json({ error: "Categoria não encontrado" });
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const remove = async(req,res) => { 
    
    try {
        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ error: "Categoria não encontrado" });

        category.active = false;

        await category.save();
       
        return res.json('categoria removida')
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};