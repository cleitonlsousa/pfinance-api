import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
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
    groups: [{
        type: String
    }]
});

userSchema.pre("save", async function(next){
    const user = this

    if(!user.isModified('password')) return next()

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt)
        next()
    } catch (error) {
        console.log(error);
        throw new Error('Error hash password')
    }
});


export const User = mongoose.model('user', userSchema);