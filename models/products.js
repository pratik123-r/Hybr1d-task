const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
        trim: true,
    },
    catalogId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Product', productSchema);