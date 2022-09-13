const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Catalog', catalogSchema);