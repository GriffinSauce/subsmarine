import { addSeconds } from 'date-fns';
import Debug from 'debug';
import { TokenEntity } from '.';

const debug = Debug('subsmarine:auth');

/**
 * Takes a token entity and returns an updated `accessToken` and `expiresIn`.
 */
const refreshAccessToken = async ({
  refreshToken,
}: TokenEntity): Promise<TokenEntity> => {
  debug('refreshing access token');
  try {
    const urlParams = new URLSearchParams({
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    const url = `https://oauth2.googleapis.com/token?${urlParams}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { error, error_description } = refreshedTokens;
      if (error || error_description)
        throw new Error(`${error} - ${error_description}`);
      throw new Error(`unknown error - ${response.status}`);
    }

    // Give a 10 sec buffer
    const expiresInSeconds = refreshedTokens.expires_in - 10;
    const expiresAtDate = addSeconds(new Date(), expiresInSeconds);

    return {
      accessToken: refreshedTokens.access_token,
      expiresIn: expiresInSeconds,
      expiresAt: expiresAtDate.toISOString(),
      refreshToken: refreshedTokens.refresh_token ?? refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error(`Error refreshing accesstoken: ${error.message}`);

    throw new Error(`RefreshAccessTokenError - ${error.message}`);
  }
};

export default refreshAccessToken;
