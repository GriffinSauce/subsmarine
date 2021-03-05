import { Token } from 'types/auth';
import Debug from 'debug';

const debug = Debug('subsmarine:auth');

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (token: Token): Promise<Token> => {
  debug('refreshing access token');
  try {
    const urlParams = new URLSearchParams({
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
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
    const accessTokenExpires = Date.now() + expiresInSeconds * 1000;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      error: null,
    };
  } catch (error) {
    console.error(`Error refreshing accesstoken: ${error.message}`);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export default refreshAccessToken;
