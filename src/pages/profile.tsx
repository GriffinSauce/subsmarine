import { signIn, signOut, useSession } from 'next-auth/client';
import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { FiUser } from 'react-icons/fi';
import { AuthProviderId } from 'types/auth';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Avatar from 'components/Avatar';

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

const SignInCTA = () => (
  <>
    <Title>You are not signed in</Title>{' '}
    <div>
      <a
        href="/api/auth/signin/Google"
        className="inline-block button-blue"
        onClick={(e) => {
          e.preventDefault();
          signIn(AuthProviderId.Google);
        }}
      >
        Sign in
      </a>
    </div>
  </>
);

const Profile = () => {
  const [session] = useSession();
  return (
    <>
      <Title>Your profile</Title>
      <div className="flex items-center p-3 space-x-3 leading-none bg-gray-200 rounded-md">
        <Avatar />
        <div>
          <strong>{session.user.name}</strong>
          <br />
          <small>{session.user.email}</small>
        </div>
      </div>
      <div>
        <a
          href="/api/auth/signout"
          className="inline-block button-blue"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </a>
      </div>
    </>
  );
};

const ProfileContent: React.FC = () => {
  const [session, loading] = useSession();

  if (!session && loading) return <ProfileSkeleton />;
  if (session) return <Profile />;
  return <SignInCTA />;
};

const Page: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="grid gap-6 mt-6">
          <ProfileContent />
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
