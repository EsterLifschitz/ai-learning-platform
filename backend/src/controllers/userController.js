const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const generateToken = require('../utils/jwtGenerator');

const registerUser = async (req, res, next) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return next(new ErrorResponse('All fields are required', 400));
        }

        const phoneRegex = /^05\d{8}$/;
        if (!phoneRegex.test(phone)) {
            return next(new ErrorResponse('Invalid phone number. Must be exactly 10 digits, contain only numbers, and start with 05.', 400));
        }

        const userExists = await User.findOne({ phone });
        if (userExists) {
            return next(new ErrorResponse('User with this phone number already exists', 400));
        }

        const user = await User.create({
            name,
            phone
        });

        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id)  
            }
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return next(new ErrorResponse('Phone number is required', 400));
        }

        const phoneRegex = /^05\d{8}$/;
        if (!phoneRegex.test(phone)) {
            return next(new ErrorResponse('Invalid phone number format. Must be exactly 10 digits and start with 05.', 400));
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return next(new ErrorResponse('Invalid phone number or user does not exist', 401));
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id)  
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};