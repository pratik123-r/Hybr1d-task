const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const config = require("../config");


const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});

(async function () {
    await client.connect();
})();

client.on('connect', () => {
    console.log('connected to redis successfully!');
})

client.on('error', (error) => {
    console.log('Redis connection error :', error);
})

client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = { time: 60 }) {
    this.useCache = true;
    this.time = options.time;
    this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
    return this;
};

mongoose.Query.prototype.exec = async function () {

    if (!this.useCache) {
        return await exec.apply(this, arguments);
    }

    const key = JSON.stringify({
        ...this.getQuery()
    });

    const cacheValue = await client.hGet(this.hashKey, key);

    if (cacheValue) {
        const doc = JSON.parse(cacheValue);
        console.log("Response from Redis");
        return doc;
    }

    const result = await exec.apply(this, arguments);
    client.hSet(this.hashKey, key, JSON.stringify(result));
    client.expire(this.hashKey, this.time);

    console.log("Response from MongoDB", result);

    return result;

};

module.exports = {
    clearKey(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
};