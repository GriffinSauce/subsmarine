import { signOut, useSession } from 'next-auth/client';
import { NextPage } from 'next';
import Skeleton from 'react-loading-skeleton';
import { FiUser } from 'react-icons/fi';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import useRedirectUnauthenticated from 'hooks/useRedirectUnauthenticated';

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
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <Button as="span">Sign out</Button>
        </a>
      </div>
    </>
  );
};

const Page: NextPage = () => {
  useRedirectUnauthenticated('/');

  const [session] = useSession();

  return (
    <Layout>
      <Container>
        <div className="grid gap-6 mt-6">
          {session ? <Profile /> : <ProfileSkeleton />}
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
