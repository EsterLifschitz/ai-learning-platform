const express = require('express');
const router = express.Router();

// Import controllers
const { registerUser, loginUser } = require('../controllers/userController');

// Import middlewares
const { validateRegister } = require('../middleware/validateInput');

// --- User Routes ---
router.post('/users/register', validateRegister, registerUser);
router.post('/users/login', loginUser);

module.exports = router;