import Link from 'next/link';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/client';
import Layout from 'components/Layout';
import Container from 'components/Container';

const GOOGLE_PROVIDER_ID = 'google';

const Page: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Container>
        <h1 className="h1">Subsmarine</h1>
        <p>
          Ahoy! Subsmarine surfaces your email newsletters for easy reading.
        </p>

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
