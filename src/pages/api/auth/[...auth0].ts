import { initAuth0 } from '@auth0/nextjs-auth0';

const { handleAuth } = initAuth0({
  //   authorizationParams: {
  //   },
});

export default handleAuth();
