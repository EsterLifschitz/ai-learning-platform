const validateRegister = (req, res, next) => {
    const { name, phone } = req.body;

    if (!name || name.trim() === '') {
        res.status(400);
        return next(new Error('Name field cannot be empty'));
    }

    if (!phone || phone.trim() === '') {
        res.status(400);
        return next(new Error('Phone number field cannot be empty'));
    }

    next(); // Everything is fine, move to the controller
};

const validatePrompt = (req, res, next) => {
    const { category_id, sub_category_id, prompt } = req.body;

    if (!category_id) {
        res.status(400);
        return next(new Error('Category ID is required'));
    }

    if (!sub_category_id) {
        res.status(400);
        return next(new Error('Sub-category ID is required'));
    }

    if (!prompt || prompt.trim() === '') {
        res.status(400);
        return next(new Error('Prompt content cannot be empty'));
    }

    next(); // Everything is fine, move to the controller
};

module.exports = {
    validateRegister,
    validatePrompt
};