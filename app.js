
require('dotenv').config();
const express = require('express');
const path = require("path");
const fs = require("fs");
const { connectDb } = require('./services/mongodb-connection');
const config = require('./config');
const app = express();

/**
 * Global declarations
 */
let models = path.join(__dirname, "models");
/**
 * Bootstrap Models
 */
fs.readdirSync(models).forEach((file) => require(path.join(models, file)));

app.use(express.json());

const routes = require('./index');
app.use('/api', routes());

/**
 * Catch 404 routes
 */
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
});

app.listen(config.server.port, () => {
    console.info(`Server listning at: ${config.server.port}`)
})

connectDb()


