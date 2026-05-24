const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  
        required: true
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',  
        required: true
    },
    prompt: {
        type: String,
        required: [true, 'Prompt cannot be empty']
    },
    response: {
        type: String,
        required: [true, 'AI response is required']
    }
}, { 
    timestamps: true  
});

module.exports = mongoose.model('Prompt', PromptSchema);