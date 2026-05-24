const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Link to the user who made the request
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Link to the category
        required: true
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory', // Link to the sub-category
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
    timestamps: true // Automatically tracks the created_at field
});

module.exports = mongoose.model('Prompt', PromptSchema);