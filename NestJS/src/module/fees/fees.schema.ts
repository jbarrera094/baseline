import * as mongoose from 'mongoose';

export const FeesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },

    key: {
        type: String,
        required: true,
        unique: true,
    },

    dateCreate:{
        type: Date,
        required: true,
        default: new Date(),
    },
    dateUpdate:{
        type: Date,
        required: false
    }
})