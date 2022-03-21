import 'tailwindcss/tailwind.css';
import 'styles/global.css';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createLocalStoragePersistor } from 'react-query/createLocalStoragePersistor-experimental';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '@auth0/nextjs-auth0';
import SkeletonThemeProvider from 'components/SkeletonThemeProvider';

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
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider defaultTheme="system" attribute="class"> */}
        <ThemeProvider defaultTheme="light" attribute="class">
          <SkeletonThemeProvider>
            <Head>
              <title>Subsmarine</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </SkeletonThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
