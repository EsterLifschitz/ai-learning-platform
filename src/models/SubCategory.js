const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Sub-category name is required'],
        trim: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Relational link to the Category model
        required: [true, 'Sub-category must be linked to a parent category']
    }
}, { timestamps: true });

module.exports = mongoose.model('SubCategory', SubCategorySchema);