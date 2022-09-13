const { Router } = require('express');
const { signUp, signIn, signUpValidation, loginValidation } = require('../controllers/auth');
const { rateLimiter } = require('../services/rate-limiter');
const { validate } = require('express-validation');
const { handleError } = require('../services/error-handler');
const router = Router();

const signUpRoute = () => router.post('/register', validate(signUpValidation), handleError(signUp));
const signInRoute = () => router.post('/login', validate(loginValidation), rateLimiter(10, 50000), handleError(signIn));


module.exports = () => router.use([signUpRoute(), signInRoute()])