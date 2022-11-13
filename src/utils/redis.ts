import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
const toUseRedis = process.env.USE_REDIS === 'true';

let redis: Redis | null;

if (toUseRedis && redisUrl) redis = new Redis(redisUrl);
else redis = null;

export default redis;
