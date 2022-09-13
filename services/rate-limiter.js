const rateLimit = require("express-rate-limit");

const rateLimiter = (max, windowMs) => rateLimit({
    max: max,
    windowMs: windowMs,
    message: "Too many request from this IP"
})

module.exports = { rateLimiter }