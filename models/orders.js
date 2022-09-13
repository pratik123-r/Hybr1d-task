const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    quantity: {
        type: Schema.Types.Number,
        required: true,
        trim: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    buyerId: {
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


module.exports = mongoose.model('Order', orderSchema);