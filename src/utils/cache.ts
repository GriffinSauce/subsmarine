import redisClient from 'utils/redisClient';
import Debug from 'debug';
import { encode, decode } from 'lz4';

const debug = Debug('subsmarine:cache');

interface CacheOptions<Params, ReturnValue> {
  /**
   * The async function that should be wrapped
   */
  getFreshValue: (params: Params) => Promise<ReturnValue>;
  /**
   * Create a unique key from the parameters of `get` or `invalidate`
   */
  generateKey: (params: Params) => string;
  /**
   * Time to life in seconds
   */
  ttl: number;
}

interface Cache<Params, ReturnValue> {
  /**
   * Try to get a cached value, if it doesn't exist fetch a fresh value and store it (with TTL)
   * Cached values are compressed with lz4 to save storage space and download time
   */
  get: (params: Params) => Promise<ReturnValue>;
  /**
   * Invalidate the cache entry for a particular set of params
   */
  invalidate: (params: Params) => Promise<number>;
}

/**
 * Wrap an async function with a Redis cache
 */
export const makeCache = <Params, ReturnValue>({
  generateKey,
  getFreshValue: fetchFreshValue,
  ttl,
}: CacheOptions<Params, ReturnValue>): Cache<Params, ReturnValue> => ({
  get: async (params) => {
    const key = generateKey(params);

    let cachedValue: Buffer | null;
    try {
      debug(`try - ${key}`);
      cachedValue = await redisClient.getBuffer(key);
    } catch (err) {
      console.error(`Error getting ${err.message}`);
    }

    if (cachedValue) {
      try {
        debug(`hit - ${key}`);
        return JSON.parse(decode(cachedValue).toString());
      } catch (err) {
        console.error(`Error parsing cached value ${err.message}`);
      }
    }

    const freshValue = await fetchFreshValue(params);

    try {
      debug(`miss - ${key}`);
      const encodedValue = encode(Buffer.from(JSON.stringify(freshValue)));
      await redisClient.setex(key, ttl, encodedValue);
    } catch (err) {
      console.error(`Error saving value to cache ${err.message}`);
    }

    return freshValue;
  },
  invalidate: (params) => redisClient.del(generateKey(params)),
});

export default makeCache;
