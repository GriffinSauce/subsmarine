import fetcher from 'utils/fetcher';
import makeCache from 'utils/makeCache';
import { addSeconds } from 'date-fns';
import Debug from 'debug';
import { TokenEntity } from '.';

const debug = Debug('subsmarine:auth');

interface ApiAccesTokenResponse {
  access_token: string;
  token_type: 'Bearer';
}

interface UserMetaData {
  auth: {
    refreshToken: string;
  };
}

interface AuthenticationData {
  connection: string;
  isSocial: boolean;
  provider: string;
  user_id: string;
  profileData: Record<string, unknown>;
  access_token: string; // Technically optional
  expires_in: number; // Technically optional
  refresh_token: string; // Technically optional
}

interface User {
  created_at: string; // ISO date string
  email_verified: boolean;
  email: string;
  family_name: string;
  given_name: string;
  identities: AuthenticationData[];
  last_password_reset: string; // ISO date string
  last_login: string; // ISO date string
  multifactor: string[];
  name: string;
  nickname: string;
  permissions: string;
  phone_number: string;
  phone_verified: boolean;
  picture: string;
  updated_at: string; // ISO date string
  user_id: string;
  username: string;
  user_metadata?: UserMetaData;
  app_metadata?: Record<string, unknown>;
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

/**
 * Fetch the Auth0 user profile
 */
const getUserProfile = async ({ userId }: { userId: string }) => {
  // TODO: error handling
  const {
    access_token: apiAccessToken,
  } = await getAuth0ManagementApiAccessTokenCached();

  return fetcher<User>(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
    {
      method: 'GET',
      headers: { authorization: `Bearer ${apiAccessToken}` },
    },
  );
};

const getAuth0UserGoogleAccessToken = async ({
  userId,
}: {
  userId: string;
}): Promise<TokenEntity> => {
  const user = await getUserProfile({ userId });

  const googleAuthKey = 'google-oauth2';
  const googleAuthData = user.identities.find(
    (identity) => identity.connection === googleAuthKey,
  );

  const { access_token: accessToken } = googleAuthData;

  // From last authentication or previously saved in meta
  // Google only sends the refresh token at the first(?) login
  const refreshToken =
    googleAuthData.refresh_token || user.user_metadata.auth.refreshToken;

  // expires_in is set only at login so re-calculate it
  const lastLogin = new Date(user.last_login);
  const expiresIn = googleAuthData.expires_in;
  const expiresAtDate = addSeconds(lastLogin, expiresIn);

  return {
    accessToken,
    refreshToken,
    expiresAt: expiresAtDate.toISOString(),
    expiresIn,
  };
};

export default getAuth0UserGoogleAccessToken;
