const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { generateToken, decodeToken } = require('./jwt-token');
const User = mongoose.model('User');


const findByCredentials = async (userName, password) => {
    const user = await User.findOne({ userName: userName }).lean();
    if (!user)
        throw new Error('Incorrect user name or password.');

    if (!await compareHashPassword(password, user.password))
        throw new Error('Incorrect user name or password.');

    delete user['password']
    user.token = await generateToken({ _id: user._id })

    return user;

}

const findByToken = async (token) => {

    const { _id } = await decodeToken(token)
    const user = await User.findById(_id).select('-password').lean();
    if (!user) throw new Error('Invalid Token')

    return user


}


const generateHashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        throw new Error("Generate hash password")
    }
}

const compareHashPassword = async (plainPassword, hash) => {
    try {
        return bcrypt.compare(plainPassword, hash)
    } catch (error) {
        throw new Error("compare password")
    }
}

module.exports = {
    generateHashPassword,
    compareHashPassword,
    findByCredentials,
    findByToken
}


