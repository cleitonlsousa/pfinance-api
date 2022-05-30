import { Transaction } from '../models/transaction.js';
import { RecurringEnum } from '../enuns/transaction.recurring.enum';

export const create = async(req,res) => { 

    try {

        const {type, value, date, user, account, category, recurring, group, split, recurring_interval, split_transaction_id} = req.body;      

        const recurringEnum =  Object.keys(RecurringEnum);
        
        if(recurring_interval && !recurringEnum.includes(recurring_interval)) return res.status(400).json({ error: "Tipo de intervalo inválido" });
                
        const transaction = new Transaction({type, value, date, user, account, category, recurring, group, split, recurring_interval, split_transaction_id});
    
        await transaction.save();

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
        
        const {type, value, date, user, account, category, recurring, group, split, recurring_interval, split_transaction_id} = req.body; 

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ error: "transação não encontrada" });

        transaction.type = (type) ? type : transaction.type;
        transaction.value = (value) ? value : transaction.value;
        transaction.date = (date) ? date : transaction.date;
        transaction.user = (user) ? user : transaction.user;
        transaction.account = (account) ? account : transaction.account;
        transaction.category = (category) ? category : transaction.category;
        transaction.recurring = (recurring) ? recurring : transaction.recurring;
        transaction.group = (group) ? group : transaction.group;
        transaction.split = (split) ? split : transaction.split;
        transaction.recurring_interval = (recurring_interval) ? recurring_interval : transaction.recurring_interval;
        transaction.split_transaction_id = (split_transaction_id) ? split_transaction_id : transaction.split_transaction_id;
        
        await transaction.save();

        return res.json({ transaction });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const find = async(req,res) => { 
    
    try {

        const transaction = await Transaction.findById(req.params.id);

        return (transaction) ? res.json({ transaction }) : res.status(404).json({ error: "Transação não encontrada" });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const remove = async(req,res) => { 
    
    try {

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ error: "Transação não encontrada" });

        await transaction.remove();
       
        return res.json('transação removida')
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};