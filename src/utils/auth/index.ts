import Debug from 'debug';
import { differenceInSeconds } from 'date-fns';
import refreshAccessToken from './refreshAccessToken';
import getGoogleAccessToken from '../auth0/getGoogleAccessToken';
import setGoogleAccessToken from '../auth0/setGoogleRefreshToken';
import { TokenEntity } from 'types/auth';

const debug = Debug('subsmarine:auth');

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
  debug(`fetching token from auth0`);
  let tokenEntity: TokenEntity | null = await getGoogleAccessToken({
    userId,
  });

  const expiryDate = new Date(tokenEntity.expiresAt);
  const isExpired = differenceInSeconds(expiryDate, new Date()) < 0;

  if (!isExpired) return tokenEntity;

  debug(`token expired - refreshing token`);
  tokenEntity = await refreshAccessToken(tokenEntity);

  debug(`saving to user metadata`);
  await setGoogleAccessToken({ userId, tokenEntity });

  return tokenEntity;
};
