import { TokenEntity } from 'types/auth';
import fetcher from 'utils/fetcher';
import { User, UserMetaData } from '.';
import getManagementApiAccessToken from './getManagementApiAccessToken';

/**
 * Set refresh token on the Auth0 user profile
 */
const setGoogleAccessToken = async ({
  userId,
  tokenEntity,
}: {
  userId: string;
  tokenEntity: TokenEntity;
}) => {
  // TODO: error handling
  const { access_token: apiAccessToken } = await getManagementApiAccessToken();

  // The metadata object is shallow merged on patch
  // So we're overwriting the whole auth object here
  const userMetadata = {
    auth: tokenEntity,
  };

  return fetcher<User>(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
    {
      method: 'PATCH',
      headers: { authorization: `Bearer ${apiAccessToken}` },
      body: {
        user_metadata: userMetadata,
      },
    },
  );
};

export default setGoogleAccessToken;
