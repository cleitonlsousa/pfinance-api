import mongoose from 'mongoose';
import mongooseDateonly from 'mongoose-dateonly';
import dateFormat, { masks } from "dateformat";

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
        type: mongooseDateonly(mongoose),
        required: true,
        default: Date.now,
        index: { unique: false}
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: { unique: false}
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Account",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: { unique: false},
        ref: "Category",
    },
    recurring: {
        type: String,
        required: true
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
    },
    created_at: {
        type: Date, 
        //default: Date.now
    },
    updated_at: {
        type: Date, 
        default: Date.now
    }
},
{   versionKey: false}   
);

transactionSchema.pre('save', function (next) {
    if (this.isNew) {
      if (this.created_at == null) {
        this.created_at = new Date().toLocaleString()
      }
      this.updated_at = this.created_at
    } else {
      this.updated_at = new Date().toLocaleString()
    }

    next()
})

transactionSchema.method({
    transform() {
    const transformed = {};
    const fields = ['id', 'type', 'value', 'date', 'user', 'account', 'category', 'recurring', 'split', 'created_at'];
    
    fields.forEach((field) => {
        transformed[field] = this[field];
    });
    transformed['date'] = dateFormat(this['date'].toDate(), "dd/mm/yyyy");
    return transformed;
    },
 });

export const Transaction = mongoose.model('transaction', transactionSchema);