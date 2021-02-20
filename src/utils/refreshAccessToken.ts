import { Token } from 'types/auth';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (token: Token): Promise<Token> => {
  try {
    const url = `https://oauth2.googleapis.com/token`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_ID,
        client_secret: process.env.GOOGLE_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
      method: 'POST',
    });

    const accessToken = await response.json();

    if (!response.ok) {
      const { error, error_description } = accessToken;
      if (error || error_description)
        throw new Error(`${error} - ${error_description}`);
      throw new Error(`unknown error - ${response.status}`);
    }

    // Give a 10 sec buffer
    const now = new Date();
    const accessTokenExpires = now.setSeconds(
      now.getSeconds() + accessToken.expires_in - 10,
    );

    return {
      ...token,
      accessToken: accessToken.access_token,
      accessTokenExpires,
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
