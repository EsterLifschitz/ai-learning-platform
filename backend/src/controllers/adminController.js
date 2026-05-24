const Prompt = require('../models/Prompt');
 
const getAllUserPrompts = async (req, res, next) => {
    try {
         
        const page = parseInt(req.query.page) || 1;    
        const limit = parseInt(req.query.limit) || 10;  
        
         
        const skip = (page - 1) * limit;

         
        const prompts = await Prompt.find({})
            .populate('user_id', 'name phone')  
            .sort({ createdAt: -1 })         
            .skip(skip)
            .limit(limit);

         
        const totalPrompts = await Prompt.countDocuments({});

         
        res.status(200).json({
            success: true,
            count: prompts.length,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalPrompts / limit),
                totalItems: totalPrompts,
                itemsPerPage: limit
            },
            data: prompts
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUserPrompts
};