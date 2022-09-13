const { Router } = require('express');
const { getAllSeller, getCatalogBySeller, createOrder, getAllSellerValidation, getCatalogBySellerValidation, createOrderValidation } = require('../controllers/buyer');
const { authMiddleWare } = require('../middleware/authenticate');
const { handleError } = require('../services/error-handler');
const { validate } = require('express-validation');
const router = Router();

const getAllSellerRoute = () => router.get('/list-of-sellers', validate(getAllSellerValidation), authMiddleWare('BUYER'), handleError(getAllSeller));
const getCatalogBySellerRoute = () => router.get('/seller-catalog/:sellerId', validate(getCatalogBySellerValidation), authMiddleWare('BUYER'), handleError(getCatalogBySeller));
const createOrderRoute = () => router.post('/create-order', validate(createOrderValidation), authMiddleWare('BUYER'), handleError(createOrder));


module.exports = () => router.use([getAllSellerRoute(), getCatalogBySellerRoute(), createOrderRoute()])