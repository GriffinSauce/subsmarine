import Link from 'next/link';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/client';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Logo from 'components/Logo';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { AuthProviderId } from 'types/auth';

const Page: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Container>
        <div className="mt-6 space-y-6 text-center">
          <Logo className="inline-block h-40" />
          <h1 className="h1">Subsmarine</h1>
          <p className="text-lg">
            Ahoy! Subsmarine surfaces your email newsletters for easy reading.
          </p>

          {loading ? (
            <Loader />
          ) : (
            <div
              className="mt-6 space-y-6"
              style={{ opacity: loading ? 0 : 1 }}
            >
              {session ? (
                <>
                  <p>
                    <Link href="/subs">
                      <a>
                        <Button as="span">Get reading</Button>
                      </a>
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Subsmarine only works with Gmail for now.
                    <br />
                    Sign in to get started.
                  </p>
                  <p>
                    <a
                      href="/api/auth/signin/Google"
                      onClick={(e) => {
                        e.preventDefault();
                        signIn(AuthProviderId.Google);
                      }}
                    >
                      <Button as="span">Sign in</Button>
                    </a>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
