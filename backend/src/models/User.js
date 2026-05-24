const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,  
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  
        default: 'user'
    }
}, { 
    timestamps: true  
});

module.exports = mongoose.model('User', UserSchema);