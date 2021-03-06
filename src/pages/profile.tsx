import { signOut, useSession } from 'next-auth/client';
import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { FiUser } from 'react-icons/fi';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import useRedirectUnauthenticated from 'hooks/useRedirectUnauthenticated';
import ThemeToggle from 'components/ThemeToggle';

const Title: React.FC = ({ children }) => (
  <h1 className="flex flex-row items-center justify-start space-x-3 h1">
    <FiUser />
    <span>{children}</span>
  </h1>
);

const ProfileSkeleton = () => (
  <>
    <Title>
      <Skeleton width={200} />
    </Title>
    <div>
      <Skeleton width={200} />
    </div>
  </>
);

const Profile = () => {
  const [session] = useSession();
  return (
    <>
      <Title>Your profile</Title>

      <section className="space-y-3">
        <h2 className="h2">Connected account</h2>
        <div className="flex items-center p-3 space-x-3 leading-none bg-gray-200 rounded-md dark:bg-blue-900">
          <Avatar />
          <div>
            <strong>{session.user.name}</strong>
            <br />
            <small>{session.user.email}</small>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="h2">Theme</h2>
        <p>
          Warning: dark mode is experimental and will not work properly with
          many newsletters. Work in progress...
        </p>
        <ThemeToggle />
      </section>

      <section>
        <a
          href="/api/auth/signout"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <Button as="span">Sign out</Button>
        </a>
      </section>
    </>
  );
};

const Page: NextPage = () => {
  useRedirectUnauthenticated('/');

  const [session] = useSession();

  return (
    <Layout>
      <Container>
        <div className="mt-6 space-y-12">
          {session ? <Profile /> : <ProfileSkeleton />}
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
