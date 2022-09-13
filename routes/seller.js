const { Router } = require('express');
const { createCatalog, addProduct, getOrders, createCatalogValidation, addProductValidation } = require('../controllers/seller');
const { authMiddleWare } = require('../middleware/authenticate');
const { handleError } = require('../services/error-handler');
const { validate } = require('express-validation');
const router = Router();

const createCatalogRoute = () => router.post('/create-catalog', validate(createCatalogValidation), authMiddleWare('SELLER'), handleError(createCatalog));
const getOrdersRoute = () => router.get('/orders', authMiddleWare('SELLER'), handleError(getOrders));
const addProductRoute = () => router.post('/add-product', validate(addProductValidation), authMiddleWare('SELLER'), handleError(addProduct));


module.exports = () => router.use([createCatalogRoute(), getOrdersRoute(), addProductRoute()])