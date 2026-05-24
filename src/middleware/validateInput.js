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

    next();
};

module.exports = {
    validateRegister
};