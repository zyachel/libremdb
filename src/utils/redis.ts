import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL

if (!redisUrl) {
  throw 'Please set the REDIS_URL environment variable.'
}

const redis = new Redis(redisUrl)

export default redis
