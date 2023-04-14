const ageValidation = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age <= 17 || !Number.isInteger(age) || typeof age !== 'number') {
        return res.status(400).json({
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
         });
    };
    return next();

};

module.exports = ageValidation;