import mongoose from "mongoose";

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
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recurring: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId
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

},
{ 
    versionKey: false 
}
);

export const Transaction = mongoose.model('transaction', transactionSchema);