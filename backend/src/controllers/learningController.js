const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Prompt = require('../models/Prompt');
const aiService = require('../services/aiService');
const ErrorResponse = require('../utils/errorResponse');

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

const getSubCategories = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

         
        const category = await Category.findById(categoryId);
        if (!category) {
            return next(new ErrorResponse(`Category not found with id of ${categoryId}`, 404));
        }

         
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

 
const generateLessonPrompt = async (req, res, next) => {
    try {
        const { category_id, sub_category_id, prompt } = req.body;
        const userId = req.user._id;  

         
        const category = await Category.findById(category_id);
        if (!category) {
            return next(new ErrorResponse('Invalid Category ID', 404));
        }

        const subCategory = await SubCategory.findById(sub_category_id);
        if (!subCategory) {
            return next(new ErrorResponse('Invalid Sub-Category ID', 404));
        }

         
        const aiResponse = await aiService.generateLesson(category.name, subCategory.name, prompt);

         
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