const config = {};

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET
};
config.mongoURI='mongodb://admin:1q3e5t@ds117158.mlab.com:17158/chat-db';

module.exports = config;
