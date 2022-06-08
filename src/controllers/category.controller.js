import { Category } from "../models/category.js";

export const create = async(req,res) => { 
    const {name, description, parent} = req.body;

    try {
        const category = new Category({name, description, active: true, parent, user: req.uid});
    
        await category.save();

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

        if (!category.user.equals(req.uid)) return res.status(401).json({ error: "Sem permissão para essa categoria" });

        category.name = (name) ? name : category.name;
        category.description = (description) ? description : category.description;
        category.parent = (parent) ? parent : category.parent;

        console.log(category)

        await category.save();

        return res.json({ id: category.id, name: category.name, description: category.description, parent: category.parent});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const findAll = async(req,res) => { 
    
    try {

        const filters = {
            active: true,
            user: req.uid
        }

        let categories = await Category.find(filters).sort({ name: 'asc'});       

        if (!categories) return res.status(404).json({ error: "Categoria não encontrado" });

        categories = categories.map((c) => {return c.transform()});

        return res.json({ categories });
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const find = async(req,res) => { 
    
    try {
        
        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ error: "Categoria não encontrado" });

        if (!category.user.equals(req.uid)) return res.status(401).json({ error: "Sem permissão para essa categoria" });

        return res.json({ category });
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const remove = async(req,res) => { 
    
    try {
        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ error: "Categoria não encontrado" });

        if (!category.user.equals(req.uid)) return res.status(401).json({ error: "Sem permissão para essa categoria" });

        category.active = false;

        await category.save();
       
        return res.json('categoria removida')
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};