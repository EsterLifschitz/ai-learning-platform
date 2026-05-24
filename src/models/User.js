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
        unique: true, // Prevents duplicate registrations with the same phone number
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Defines the user privilege level
        default: 'user'
    }
}, { 
    timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);