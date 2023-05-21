/* eslint-disable no-unused-vars */
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
const toUseRedis =
  process.env.USE_REDIS === 'true' || process.env.USE_REDIS_FOR_API_ONLY === 'true';

const stub: Pick<Redis, 'get' | 'setex' | 'getBuffer'> = {
  get: async key => Promise.resolve(null),
  setex: async (key, seconds, value) => Promise.resolve('OK'),
  getBuffer: (key, callback) => Promise.resolve(null),
};

const redis = toUseRedis && redisUrl ? new Redis(redisUrl) : stub;

export default redis;
