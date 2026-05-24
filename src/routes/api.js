const express = require('express');
const router = express.Router();

// Import controllers
const { registerUser, loginUser } = require('../controllers/userController');
const { getCategories, getSubCategories, generateLessonPrompt } = require('../controllers/learningController');

// Import middlewares
const { validateRegister, validatePrompt } = require('../middleware/validateInput');


// ייבוא הקונטרולר של ה-Admin
const { getAllUserPrompts } = require('../controllers/adminController');

// ודאי שבייבוא של ה-authMiddleware נמצאים גם protect וגם adminOnly:
const { protect, adminOnly } = require('../middleware/auth');

// --- User Routes ---
router.post('/users/register', validateRegister, registerUser);
router.post('/users/login', loginUser);

// --- Learning Routes (All protected by JWT Auth) ---
router.get('/categories', protect, getCategories);
router.get('/categories/:categoryId/subcategories', protect, getSubCategories);
router.post('/learning/prompt', protect, validatePrompt, protect, generateLessonPrompt);
//מנהל יכול לקבל את כל הפרומפטים
router.get('/admin/prompts', protect, adminOnly, getAllUserPrompts);

module.exports = router;