const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');
const User = mongoose.model('User');
const { Joi } = require('express-validation');

const getAllSellerValidation = {
    query: Joi.object({
        page: Joi.number().default(1),
        limit: Joi.number().default(20),
    }),

};
const getAllSeller = async (req, res) => {
    const { query: { page = 1, limit = 20 } } = req;
    const users = await User.find({ userType: 'SELLER' }).select('-password').limit(limit * 1)
        .skip((page - 1) * limit)
    const docCount = await User.find({ userType: 'SELLER' }).count();
    res.send({
        data: {
            users: users,
            totalPages: Math.ceil(docCount / limit),
            currentPage: page
        }
    })
}

const getCatalogBySellerValidation = {
    query: Joi.object({
        page: Joi.number().default(1),
        limit: Joi.number().default(20),
    }),
    params: Joi.object({ sellerId: Joi.string().required() }),
};

const getCatalogBySeller = async (req, res) => {
    const { query: { page = 1, limit = 20 }, params: { sellerId } } = req;
    const products = await Product.find({ sellerId: sellerId }).select('-password').limit(limit * 1)
        .skip((page - 1) * limit)
    const docCount = await Product.find({ sellerId: sellerId }).count();
    res.send({
        data: {
            products: products,
            totalPages: Math.ceil(docCount / limit),
            currentPage: page
        }
    })
}

const createOrderValidation = {
    body: Joi.object({
        products: Joi.array().items(Joi.object({
            productId: Joi.string().required(),
            sellerId: Joi.string().required(),
            quantity: Joi.number().required(),
        }))
    }),
};

const createOrder = async (req, res) => {
    let { body: { products }, user } = req;
    if (products.length == 0) throw new Error('Please add atleast one item.')
    products = products.map((product) => {
        return {
            ...product,
            buyerId: user._id
        }
    })
    await Order.insertMany(products)
    res.send({ message: 'order is created' })
}

module.exports = {
    getAllSeller,
    getCatalogBySeller,
    createOrder,
    getAllSellerValidation,
    getCatalogBySellerValidation,
    createOrderValidation
}