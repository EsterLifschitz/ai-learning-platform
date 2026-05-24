const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if token exists in the Authorization header (Format: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and attach it to the request object (excluding password/sensitive details if any)
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                res.status(401);
                return next(new Error('Not authorized, user not found'));
            }

            return next();
        } catch (error) {
            res.status(401);
            return next(new Error('Not authorized, token failed'));
        }
    }

    if (!token) {
        res.status(401);
        return next(new Error('Not authorized, no token provided'));
    }
};

// Middleware to restrict access only to Admin users
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        return next(new Error('Access denied. Admins only'));
    }
};

module.exports = { protect, adminOnly };