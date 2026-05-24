const Prompt = require('../models/Prompt');

// @desc    Get all user prompts with pagination
// @route   GET /api/admin/prompts
// @access  Private/Admin
const getAllUserPrompts = async (req, res, next) => {
    try {
        // 1. קריאת פרמטרים מה-Query String (עם ערכי ברירת מחדל)
        const page = parseInt(req.query.page) || 1;   // עמוד נוכחי (ברירת מחדל: 1)
        const limit = parseInt(req.query.limit) || 10; // מספר פריטים בעמוד (ברירת מחדל: 10)
        
        // 2. חישוב מספר הפריטים שצריך לדלג עליהם (Offset)
        const skip = (page - 1) * limit;

        // 3. שליפת הנתונים מהדאטהבייס עם skip ו-limit, וחיבור נתוני המשתמש (populate)
        const prompts = await Prompt.find({})
            .populate('user_id', 'name phone') // מביא את שם המשתמש והטלפון שלו במקום רק ה-ID
            .sort({ createdAt: -1 })        // מציג את החדשים ביותר קודם
            .skip(skip)
            .limit(limit);

        // 4. ספירת סך כל המסמכים הקיימים (בשביל שהפרונטנד ידע כמה עמודים יש סך הכל)
        const totalPrompts = await Prompt.countDocuments({});

        // 5. החזרת התשובה המובנית ללקוח
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