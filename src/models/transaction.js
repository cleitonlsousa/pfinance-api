import mongoose from "mongoose";
'type', 'value', 'date', 'user', 'account', 'category', 'recurring', 'group', 'split'
const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    recurring: {
        type: String,
        required: true
    },
    group: {
        type: String
    },
    split: {
        type: Boolean,
        default: false
    },
    recurring_interval: {
        type: Boolean
    },
    split_transaction_id: {
        type: String
    }    

});

export const Transaction = mongoose.model('transaction', transactionSchema);