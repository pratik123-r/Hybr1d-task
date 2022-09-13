const mongoose = require('mongoose');
const Catalog = mongoose.model('Catalog');
const Product = mongoose.model('Product');
const { Joi } = require('express-validation');
const { getOrderAggregate } = require('../services/seller');


const createCatalogValidation = {
    body: Joi.object({
        name: Joi.string().required(),
    }),
};
const createCatalog = async (req, res) => {
    const { body: { name }, user } = req

    const catalog = await new Catalog({
        name: name,
        sellerId: user._id
    }).save()

    res.send({ message: "catalog created", data: catalog })
}

const getOrders = async (req, res) => {
    const { query: { page = 1, limit = 20 }, user } = req;

    const orders = await getOrderAggregate(user._id, Number(page), Number(limit))

    res.send({
        data: {
            orders: orders[0]?.data,
            totalPages: Math.ceil(orders[0]?.metadata[0]?.total / limit),
            currentPage: page
        }
    })
}

const addProductValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required()
    }),
};
const addProduct = async (req, res) => {
    const { body: { name, price }, user } = req

    const catalog = await Catalog.findOne({ sellerId: user._id })

    if (!catalog) throw new Error("Catalog is not found.")

    const product = await new Product({
        name: name,
        price: price,
        catalogId: catalog._id,
        sellerId: user._id
    }).save()

    res.send({ message: "Product created", data: product })
}

module.exports = {
    createCatalog,
    getOrders,
    addProduct,
    createCatalogValidation,
    addProductValidation
}