import redis from 'src/utils/redis';

const ttl = process.env.REDIS_CACHE_TTL_API ?? 30 * 60;
const redisEnabled =
  process.env.USE_REDIS === 'true' || process.env.USE_REDIS_FOR_API_ONLY === 'true';

const getOrSetApiCache = async <T extends (...fetcherArgs: any[]) => Promise<any>>(
  key: string,
  fetcher: T,
  ...fetcherArgs: Parameters<T>
): Promise<ReturnType<T>> => {
  if (!redisEnabled) return await fetcher(...fetcherArgs);

  const dataInCache = await redis.get(key);
  if (dataInCache) return JSON.parse(dataInCache);

  const dataToCache = await fetcher(...fetcherArgs);

  await redis.setex(key, ttl, JSON.stringify(dataToCache));

  return dataToCache;
};

export default getOrSetApiCache;
