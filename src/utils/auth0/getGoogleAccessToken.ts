import Debug from 'debug';
import { TokenEntity } from 'types/auth';
import getUserProfile from './getUserProfile';

const debug = Debug('subsmarine:auth');

const getGoogleAccessToken = async ({
  userId,
}: {
  userId: string;
}): Promise<TokenEntity> => {
  const user = await getUserProfile({ userId });

  /**
   * Google only sends the refresh token at the first(?) login.
   * We save the auth data into metadata with so we can access the refresh token later and update the access token at will
   *
   * Rule that sets the metadata on login: .auth/googleAccessTokens.js
   */
  return user.user_metadata.tokenEntity;
};

export default getGoogleAccessToken;
