import Link from 'next/link';
import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Logo from 'components/Logo';
import Button from 'components/Button';
import Loader from 'components/Loader';

const Page: NextPage = () => {
  // TODO: error handling
  const { user, error, isLoading } = useUser();

  return (
    <Layout>
      <Container>
        <div className="mt-6 space-y-6 text-center">
          <Logo className="inline-block h-40" />
          <h1 className="h1">Subsmarine</h1>
          <p className="text-lg">
            Ahoy! Subsmarine surfaces your email newsletters for easy reading.
          </p>

          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="mt-6 space-y-6"
              style={{ opacity: isLoading ? 0 : 1 }}
            >
              {user ? (
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
                  <p>Sign in to get started.</p>
                  <p>
                    <a href="/api/auth/login">
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
