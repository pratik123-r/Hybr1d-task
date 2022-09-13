const config = require("../config");
let mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
    console.info("DATABASE - Connected");
});

mongoose.connection.on("error", (err) => {
    console.error("DATABASE - Error:" + err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("DATABASE - disconnected");
});

let connectDb = async () => {
    try {
        await mongoose.connect(config.database.connectionUrl, config.database.dbOptions)
    } catch (error) {
        console.error("DATABASE - Error:" + error);
    }
};

module.exports = {
    connectDb
}

