const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = async (payload) => {
    try {
        return jwt.sign(
            payload,
            config.jwtSecret
        ).toString();
    } catch (error) {
        throw new Error('Generating JWT token.')
    }

}

const decodeToken = async (token) => {
    try {
        return await jwt.verify(token, config.jwtSecret);
    } catch (error) {
        throw new Error('Invalid auth token.')
    }

}

module.exports = {
    generateToken, decodeToken
}