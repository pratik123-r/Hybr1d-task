const mongoose = require('mongoose');
const User = mongoose.model('User');
const { Joi } = require('express-validation');
const { generateHashPassword, findByCredentials } = require('../services/auth');

const signUpValidation = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
        userType: Joi.string().valid('BUYER', 'SELLER').required(),
        password: Joi.string().required()
    }),
};


const signUp = async (req, res) => {
    const {
        body: { password },
    } = req;
    const user = new User({ ...req.body, password: await generateHashPassword(password) })
    await user.save()
    res.send({
        message: "user created,",
    })
}

const loginValidation = {
    body: Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required()
    }),
};

const signIn = async (req, res, next) => {
    const {
        body: { userName, password },
    } = req;

    const user = await findByCredentials(userName, password);

    res.send({
        message: "user loggedIn.",
        data: user
    })
}

module.exports = {
    signUp,
    signIn,
    signUpValidation,
    loginValidation
}