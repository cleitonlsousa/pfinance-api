import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    parent: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: { unique: false}
    }
},
{ 
    versionKey: false 
}
);

categorySchema.method({
    transform() {
    const transformed = {};
    const fields = ['id', 'name', 'value', 'description', 'parent'];
    
    fields.forEach((field) => {
        transformed[field] = this[field];
    });
    
    return transformed;
    },
 });

export const Category = mongoose.model('category', categorySchema);