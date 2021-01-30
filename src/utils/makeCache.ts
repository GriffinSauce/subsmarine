import redisClient from 'utils/redisClient';
import Debug from 'debug';

const debug = Debug('cache');

interface CacheOptions<Params, ReturnValue> {
  generateKey: (params: Params) => string;
  fetchFreshValue: (params: Params) => ReturnValue;
  ttl: number;
}

const makeCache = <Params, ReturnValue extends Promise<any>>({
  generateKey,
  fetchFreshValue,
  ttl,
}: CacheOptions<Params, ReturnValue>) => {
  // @ts-expect-error - ReturnValue is not a valid return?
  return async (params: Params): ReturnValue => {
    const key = generateKey(params);
    debug(`try - ${key}`);

    const cachedValue = await redisClient.get(key);

    if (cachedValue && typeof cachedValue === 'string') {
      try {
        debug(`hit - ${key}`);
        return JSON.parse(cachedValue);
      } catch (err) {
        console.error(`Error parsing cached value ${err.message}`);
      }
    }

    const freshValue = await fetchFreshValue(params);

    try {
      debug(`miss - ${key}`);
      await redisClient.setex(key, ttl, JSON.stringify(freshValue));
    } catch (err) {
      console.error(`Error saving value to cache ${err.message}`);
    }

    return freshValue;
  };
};

export default makeCache;
