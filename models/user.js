const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    userName: {
        type: Schema.Types.String,
        trim: true,
        required: true,
        unique: true,
    },
    userType: {
        type: Schema.Types.String,
        enum: ['BUYER', 'SELLER'],
        default: 'BUYER'
    },
    password: {
        type: Schema.Types.String,
        required: true,
    }
}, {
    timestamps: true,
});



module.exports = mongoose.model('User', userSchema);