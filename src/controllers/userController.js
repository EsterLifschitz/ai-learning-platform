const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const generateToken = require('../utils/jwtGenerator');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, phone } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ phone });
        if (userExists) {
            return next(new ErrorResponse('User with this phone number already exists', 400));
        }

        // Create new user
        const user = await User.create({
            name,
            phone
        });

        // Respond with user data and the generated JWT token
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id) // Generating the token here!
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login existing user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { phone } = req.body;

        // Find user by phone number
        const user = await User.findOne({ phone });
        if (!user) {
            return next(new ErrorResponse('Invalid phone number or user does not exist', 401));
        }

        // Respond with user data and a fresh token
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id) // Generating the token here!
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