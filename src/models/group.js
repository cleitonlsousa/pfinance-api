import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    users: [{
        type: String,
        required: true
    }]
},
{ 
    versionKey: false 
}
);

export const Group = mongoose.model('group', groupSchema);