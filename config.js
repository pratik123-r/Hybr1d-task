module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'SimpleJWT',
    database: {
        dbOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        connectionUrl: process.env.DB_URL || 'mongodb://localhost:27017/hybr1d',
    },
    server: {
        port: process.env.PORT || 3000,
    }
};