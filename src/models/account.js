import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: { unique: false}
    },
    type: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    paymant_due_day: {
        type: Number
    },
    statement_day: {
        type: Number
    },
    show_in_resume: {
        type: Boolean
    }
},
{ 
    versionKey: false 
}
);

export const Account = mongoose.model('account', accountSchema);