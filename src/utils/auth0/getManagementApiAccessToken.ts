import fetcher from 'utils/fetcher';
import makeCache from 'utils/makeCache';
import Debug from 'debug';

const debug = Debug('subsmarine:auth');

interface ApiAccesTokenResponse {
  access_token: string;
  token_type: 'Bearer';
}

/**
 * Fetch an access token to access the Auth0 management API
 */
const fetchAuth0ManagementApiAccessToken = () =>
  fetcher<ApiAccesTokenResponse>(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: 'POST',
      body: {
        client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        grant_type: 'client_credentials',
      },
    },
  );

/**
 * Cache access token system-wide
 * Token is valid for 24 hrs so this automatically takes care of expiration
 */
const getAuth0ManagementApiAccessTokenCached = makeCache<
  void,
  ReturnType<typeof fetchAuth0ManagementApiAccessToken>
>({
  generateKey: () => `system:auth0:accessToken`,
  fetchFreshValue: fetchAuth0ManagementApiAccessToken,
  ttl: 60 * 60 * 24, // 24 hours
});

export default getAuth0ManagementApiAccessTokenCached;
