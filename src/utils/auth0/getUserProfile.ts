import fetcher from 'utils/fetcher';
import getAuth0ManagementApiAccessToken from './getManagementApiAccessToken';
import { User } from '.';

/**
 * Fetch the Auth0 user profile
 */
const getUserProfile = async ({ userId }: { userId: string }) => {
  // TODO: error handling
  const {
    access_token: apiAccessToken,
  } = await getAuth0ManagementApiAccessToken();

  return fetcher<User>(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
    {
      method: 'GET',
      headers: { authorization: `Bearer ${apiAccessToken}` },
    },
  );
};

export default getUserProfile;
