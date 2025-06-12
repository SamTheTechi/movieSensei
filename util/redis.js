require("dotenv").config();
const { Redis } = require("ioredis");

const redis = new Redis(process.env.REDIS_KEY);

module.exports = redis;
