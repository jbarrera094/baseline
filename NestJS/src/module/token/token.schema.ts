import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        unique: true,
        require: true
    }
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
TokenSchema.pre('save', function(next){
    next();
});