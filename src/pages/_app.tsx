import 'tailwindcss/tailwind.css';
import 'styles/global.css';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createLocalStoragePersistor } from 'react-query/createLocalStoragePersistor-experimental';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { Provider as AuthProvider } from 'next-auth/client';

const DAY_MS = 1000 * 60 * 60 * 24; // 24 hours
const WEEK_MS = DAY_MS * 7;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: WEEK_MS,
    },
  },
});

// Successful fetches are cached locally but always revalidated
const localStoragePersistor = createLocalStoragePersistor();
persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider defaultTheme="system" attribute="class"> */}
        <ThemeProvider defaultTheme="light" attribute="class">
          <Head>
            <title>Subsmarine</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>

          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
