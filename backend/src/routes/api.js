const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');
const { getCategories, getSubCategories, generateLessonPrompt, getUserHistory } = require('../controllers/learningController');
const { validateRegister, validatePrompt } = require('../middleware/validateInput');
const { getAllUserPrompts } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/users/register', validateRegister, registerUser);
router.post('/users/login', loginUser);

router.get('/categories', protect, getCategories);
router.get('/categories/:categoryId/subcategories', protect, getSubCategories);
router.post('/learning/prompt', protect, validatePrompt, generateLessonPrompt);

/**
 * @swagger
 * /api/admin/prompts:
 * get:
 * summary: Get all user prompts with pagination (Admin only)
 * tags: [Admin]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: query
 * name: page
 * schema:
 * type: integer
 * default: 1
 * description: The page number to retrieve
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * default: 10
 * description: Number of items per page
 * responses:
 * 200:
 * description: A paginated list of user prompts
 * 401:
 * description: Unauthorized - Missing or invalid token
 * 403:
 * description: Forbidden - User is not an admin
 * 500:
 * description: Internal server error
 */
router.get('/admin/prompts', protect, adminOnly, getAllUserPrompts);

/**
 * @swagger
 * /api/learning/history:
 * get:
 * summary: Get current user learning history
 * tags: [Learning]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: A list of the user's past learning prompts and AI responses
 * 401:
 * description: Unauthorized - Missing or invalid token
 * 500:
 * description: Internal server error
 */
router.get('/learning/history', protect, getUserHistory);

module.exports = router;