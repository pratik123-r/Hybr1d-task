const { Router } = require('express');
const auth = require('./routes/auth');
const buyer = require('./routes/buyer');
const seller = require('./routes/seller');
const routes = Router();

routes.use('/auth', auth());
routes.use('/buyer', buyer());
routes.use('/seller', seller());

module.exports = () => routes