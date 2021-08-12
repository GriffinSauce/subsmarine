/**
 * Google returns the refresh token only at the first authentication with an app
 * Save it to the user's metadata on Auth0 so future logins (eg. on other devices) can access it
 *
 * Also move access token and expires here so we can manage them from a single place (and refresh them)
 */
function googleAccessTokens(user, context, callback) {
  const googleAuthKey = 'google-oauth2';
  const googleAuthData = user.identities.find(
    (identity) => identity.connection === googleAuthKey,
  );

  const {
    refresh_token: refreshToken,
    access_token: accessToken,
    expires_in: expiresIn,
  } = googleAuthData;

  // Metadata object doesn't exist by default
  user.user_metadata = user.user_metadata || {};

  const currentTokenEntity = user.user_metadata.tokenEntity || {};
  const createdDate = new Date();
  const expiresAtDate = new Date(createdDate.getTime() + expiresIn * 1000);

  // Only overwrite refreshToken when it exists, always set latest access token & expiration date
  user.user_metadata.tokenEntity = {
    refreshToken: refreshToken || currentTokenEntity.refreshToken,
    accessToken: accessToken,
    expiresAt: expiresAtDate.toISOString(),
  };

  return auth0.users
    .updateUserMetadata(user.user_id, user.user_metadata)
    .then(() => {
      callback(null, user, context);
    })
    .catch((err) => {
      callback(err);
    });
}
