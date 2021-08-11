import { addSeconds } from 'date-fns';
import Debug from 'debug';
import { TokenEntity } from 'types/auth';

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
    const {
      error,
      error_description: errorDescription,
      refresh_token: newRefreshToken,
      access_token: accessToken,
      expires_in: expiresIn,
    } = refreshedTokens;

    if (!response.ok) {
      if (error || errorDescription)
        throw new Error(`${error} - ${errorDescription}`);
      throw new Error(`unknown error - ${response.status}`);
    }

    const expiresInSeconds = expiresIn - 10; // Give a 10 sec buffer
    const expiresAtDate = addSeconds(new Date(), expiresInSeconds);

    return {
      accessToken,
      expiresAt: expiresAtDate.toISOString(),
      refreshToken: newRefreshToken ?? refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error(`Error refreshing accesstoken: ${error.message}`);

    throw new Error(`RefreshAccessTokenError - ${error.message}`);
  }
};

export default refreshAccessToken;
