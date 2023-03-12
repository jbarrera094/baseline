import * as mongoose from 'mongoose';

export const OptSchema = new mongoose.Schema({
    cellphone: {
        type: String,
        unique: true,
        required: true
    },
    code:{
        type: Number,
        required: false
    },
    create_at:{
        type: Date,
        required: true,
        default: new Date(),
    },
    update_at:{
        type: Date,
        required: true,
        default: new Date(),
    }
})