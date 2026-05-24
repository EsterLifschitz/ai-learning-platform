const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Prompt = require('../models/Prompt');
const aiService = require('../services/aiService');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all main categories
// @route   GET /api/categories
// @access  Private (Protected by JWT)
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get sub-categories for a specific category
// @route   GET /api/categories/:categoryId/subcategories
// @access  Private (Protected by JWT)
const getSubCategories = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        // Check if the parent category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return next(new ErrorResponse(`Category not found with id of ${categoryId}`, 404));
        }

        // Find all sub-categories linked to this category ID
        const subCategories = await SubCategory.find({ category_id: categoryId });

        res.status(200).json({
            success: true,
            count: subCategories.length,
            data: subCategories
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Submit a prompt, generate AI lesson, and save to history
// @route   POST /api/learning/prompt
// @access  Private (Protected by JWT)
const generateLessonPrompt = async (req, res, next) => {
    try {
        const { category_id, sub_category_id, prompt } = req.body;
        const userId = req.user._id; // Extracted automatically from the JWT Auth middleware

        // Validate that category and sub-category actually exist in DB
        const category = await Category.findById(category_id);
        if (!category) {
            return next(new ErrorResponse('Invalid Category ID', 404));
        }

        const subCategory = await SubCategory.findById(sub_category_id);
        if (!subCategory) {
            return next(new ErrorResponse('Invalid Sub-Category ID', 404));
        }

        // Send data to the AI Service (talks to real OpenAI or fallback Mock)
        const aiResponse = await aiService.generateLesson(category.name, subCategory.name, prompt);

        // Save the full transaction into the Prompt History collection
        const savedPrompt = await Prompt.create({
            user_id: userId,
            category_id,
            sub_category_id,
            prompt,
            response: aiResponse
        });

        res.status(201).json({
            success: true,
            data: savedPrompt
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    getSubCategories,
    generateLessonPrompt
};