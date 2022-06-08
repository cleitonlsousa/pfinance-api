import { Transaction } from '../models/transaction.js';
import { RecurringEnum } from '../enuns/transaction.recurring.enum.js';

import mongoose from 'mongoose';
import mongooseDateonly from 'mongoose-dateonly';

const recurringEnum =  Object.keys(RecurringEnum);
const dateOnly = new mongooseDateonly(mongoose);

export const create = async(req,res) => { 

    try {

        const {type, value, date, account, category, recurring, split, recurring_interval, split_transaction_id} = req.body;           
        
        if(recurring_interval && !recurringEnum.includes(recurring_interval)) return res.status(400).json({ error: "Tipo de intervalo inválido" });
                
        const transaction = new Transaction({type, value, date, user: req.uid, account, category, recurring, split, recurring_interval, split_transaction_id});
    
        await transaction.save({ timestamps: { createdAt: true, updatedAt: false } });

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
        
        const {type, value, date, account, category, recurring, split, recurring_interval, split_transaction_id} = req.body; 

        if(recurring_interval && !recurringEnum.includes(recurring_interval)) return res.status(400).json({ error: "Tipo de intervalo inválido" });

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ error: "transação não encontrada" });

        if (!transaction.user.equals(req.uid)) return res.status(401).json({ error: "Sem permissão para essa transação" });

        transaction.type = (type) ? type : transaction.type;
        transaction.value = (value) ? value : transaction.value;
        transaction.date = (date) ? date : transaction.date;
        transaction.account = (account) ? account : transaction.account;
        transaction.category = (category) ? category : transaction.category;
        transaction.recurring = (recurring) ? recurring : transaction.recurring;
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

        let transaction = await Transaction.findById(req.params.id);
        
        transaction = transaction.transform();

        if (!transaction) return res.status(404).json({ error: "transação não encontrada" });

        if (!transaction.user.equals(req.uid)) return res.status(401).json({ error: "Sem permissão para essa transação" });

        return res.json({ transaction });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const findAll = async(req,res) => { 
    
    try {

        let { dt_initial, dt_final} = req.query;

        const filters = {
            date: { 
                $gte: new dateOnly(dt_initial), 
                $lte: new dateOnly(dt_final) 
            },
            user: req.uid
        }

        let transactions = await Transaction.find(filters).sort({ date: 'desc'});       

        transactions = transactions.map((r) => {return r.transform()});

        if (!transactions) return res.status(404).json({ error: "transação não encontrada" });

        return (transactions) ? res.json({ transactions }) : res.status(404).json({ error: "Transações não encontradas" });      
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};

export const remove = async(req,res) => { 
    
    try {

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ error: "Transação não encontrada" });

        if (!transaction.user.equals(req.uid)) return res.status(401).json({ error: "Sem permissão para essa transação" });

        await transaction.remove();
       
        return res.json('transação removida')
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
};