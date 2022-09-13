const { findByToken } = require("../services/auth");


const authMiddleWare = (role) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization');
            if (!token) return next(new Error('Invalid auth token.'));
            let user = await findByToken(token);
            if (user.userType != role) return next(new Error('Invalid auth token.'));
            req.user = user
            return next()
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = {
    authMiddleWare
}