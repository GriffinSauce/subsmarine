/**
 * Google returns the refresh token only at the first authentication with an app
 * Save it to the user's metadata on Auth0 so future logins (eg. on other devices) can access it
 */
function googleRefreshToken(user, context, callback) {
  const refreshToken = user.identities[0] && user.identities[0].refresh_token;
  if (refreshToken) {
    user.user_metadata = user.user_metadata || {};
    user.user_metadata.auth = user.user_metadata.auth || {};
    user.user_metadata.auth.refreshToken = refreshToken;

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
