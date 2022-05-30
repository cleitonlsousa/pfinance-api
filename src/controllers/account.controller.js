import { Account } from '../models/account.js';


export const create = async(req,res) => { 
    const {name, type, amount, description, paymant_due_date, statement_date, show_in_resume} = req.body;   

    try {
                
        const account = new Account({name, type, active: true, amount, description, paymant_due_date, statement_date, show_in_resume});
    
        await account.save();

        return res.status(201).json({message: "created"})
    
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error: 'Nome de conta já utilizado'})
        }
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const update = async (req, res) => {
    try {
        
        const {name, type, amount, description, paymant_due_date, statement_date, show_in_resume} = req.body;

        const account = await Account.findById(req.params.id);

        if (!account) return res.status(404).json({ error: "Conta não encontrada" });

        account.name = (name) ? name : account.name;
        account.type = (type) ? type : account.type;
        account.amount = (amount) ? amount : account.amount;
        account.description = (description) ? description : account.description;
        account.paymant_due_date = (paymant_due_date) ? paymant_due_date : account.paymant_due_date;
        account.statement_date = (statement_date) ? statement_date : account.statement_date;
        account.show_in_resume = (show_in_resume) ? show_in_resume : account.show_in_resume;

        await account.save();

        return res.json({ account });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const find = async(req,res) => { 
    
    try {

        const account = await Account.findById(req.params.id);

        return (account) ? res.json({ account }) : res.status(404).json({ error: "Conta não encontrada" });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const remove = async(req,res) => { 
    
    try {

        const account = await Account.findById(req.params.id);

        if (!account) return res.status(404).json({ error: "Conta não encontrada" });

        account.active = false;

        await account.save();
       
        return res.json('conta removida')
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};