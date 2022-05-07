import redisClient from 'utils/redisClient';
import Debug from 'debug';
import { encode, decode } from 'lz4';

const debug = Debug('subsmarine:cache');

interface CacheOptions<Params, ReturnValue> {
  generateKey: (params: Params) => string;
  fetchFreshValue: (params: Params) => ReturnValue;
  ttl: number;
}

export const makeCache = <Params, ReturnValue extends Promise<unknown>>({
  generateKey,
  fetchFreshValue,
  ttl,
}: CacheOptions<Params, ReturnValue>) => {
  // @ts-expect-error - ReturnValue is not a valid return?
  return async (params: Params): ReturnValue => {
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
  };
};

interface InvalidateCacheOptions<Params> {
  generateKey: (params: Params) => string;
}

export const makeInvalidateCache =
  <Params>({ generateKey }: InvalidateCacheOptions<Params>) =>
  (params: Params): Promise<unknown> =>
    redisClient.del(generateKey(params));
