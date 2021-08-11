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

  const createdDate = new Date();
  const expiresAtDate = new Date(createdDate.getTime() + expiresIn * 1000);

  if (refreshToken) {
    user.user_metadata = user.user_metadata || {};
    user.user_metadata.tokenEntity = {
      refreshToken,
      accessToken,
      expiresAt: expiresAtDate.toISOString(),
    };

    // persist the user_metadata update
    return auth0.users
      .updateUserMetadata(user.user_id, user.user_metadata)
      .then(() => {
        callback(null, user, context);
      })
      .catch((err) => {
        callback(err);
      });
  }

  callback(null, user, context);
}
