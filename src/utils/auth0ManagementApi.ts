import fetcher from './fetcher';

interface ApiAccesTokenResponse {
  access_token: string;
  token_type: 'Bearer';
}

const fetchAuth0ManagementApiAccessToken = (): Promise<ApiAccesTokenResponse> =>
  fetcher(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: 'POST',
    body: {
      client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      grant_type: 'client_credentials',
    },
  });

const getUserProfile = async ({ userId }: { userId: string }) => {
  // TODO: error handling & cache token until expired
  const {
    access_token: apiAccessToken,
  } = await fetchAuth0ManagementApiAccessToken();

  // TODO: error handling & type
  const user = await fetcher(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
    {
      method: 'GET',
      headers: { authorization: `Bearer ${apiAccessToken}` },
    },
  );

  return user;
};

// TODO: renew token? https://auth0.com/docs/tokens/identity-provider-access-tokens#renew-tokens
export const getUserProviderAccessToken = async ({
  userId,
}: {
  userId: string;
}) => {
  const user = await getUserProfile({ userId });

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = user.identities[0];

  return {
    accessToken,
    refreshToken,
    expiresIn,
  };
};
