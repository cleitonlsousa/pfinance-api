import mongoose from "mongoose";


const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true}
    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: String
    }
});

export const User = model('user', userSchema);