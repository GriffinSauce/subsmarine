import { initAuth0 } from '@auth0/nextjs-auth0';

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
];

const { handleAuth } = initAuth0({
  authorizationParams: {
    access_type: 'offline',
    connection_scope: scopes.join(' '),
  },
});

export default handleAuth();
