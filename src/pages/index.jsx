import Link from 'next/link';
import { signIn, useSession } from 'next-auth/client';
import Layout from 'components/Layout';
import Container from 'components/Container';

const GOOGLE_PROVIDER_ID = 'google';

const Page = () => {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Container>
        <h1>Letterbox</h1>
        <p>Letterbox is an app that lets you read your newsletters in peace.</p>

        <div style={{ opacity: loading ? 0 : 1 }}>
          {session ? (
            <p>
              Go read{' '}
              <Link href="/stack">
                <button type="button">Your stack</button>
              </Link>
            </p>
          ) : (
            <>
              <p>Sign in with your Google Account to get started.</p>
              <p>
                <a
                  href="/api/auth/signin/Google"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn(GOOGLE_PROVIDER_ID);
                  }}
                >
                  <button type="button">Sign in</button>
                </a>
              </p>
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
