import Debug from 'debug';
import { differenceInSeconds } from 'date-fns';
import redisClient from 'utils/redisClient';
import refreshAccessToken from './refreshAccessToken';
import getAuth0UserGoogleAccessToken from './getAuth0UserGoogleAccessToken';

const debug = Debug('subsmarine:auth');

export interface TokenEntity {
  accessToken: string;
  expiresAt: string; // ISO date
  expiresIn: number;
  refreshToken: string;
}

/**
 * Get a tokenEntity with access token for Google APIs
 * Initially this will fetch what was provided during authentication
 * The refresh token is used to refresh the access token when needed
 */
export const getUserGoogleAccessToken = async ({
  userId,
}: {
  userId: string;
}): Promise<TokenEntity> => {
  const cacheKey = `user:${userId}:auth:googleAccessToken`;

  let tokenEntity: TokenEntity | null;
  try {
    debug(`trying token cache`);
    const value = await redisClient.get(cacheKey);
    tokenEntity = JSON.parse(value);
  } catch (err) {
    console.error(`Error getting ${err.message}`);
  }

  // First try, no token in our system yet
  // Fetch it from auth0
  if (!tokenEntity) {
    debug(`miss - fetching from auth0`);
    tokenEntity = await getAuth0UserGoogleAccessToken({ userId });

    // Save to cache
    await redisClient.set(cacheKey, JSON.stringify(tokenEntity));
  }

  const expiryDate = new Date(tokenEntity.expiresAt);
  const isExpired = differenceInSeconds(expiryDate, new Date()) < 0;

  if (!isExpired) return tokenEntity;

  debug(`expired - refreshing token`);

  // TODO: error handling
  tokenEntity = await refreshAccessToken(tokenEntity);

  // Save to cache
  await redisClient.set(cacheKey, JSON.stringify(tokenEntity));

  return tokenEntity;
};
