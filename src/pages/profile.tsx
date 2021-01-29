import { signIn, signOut, useSession } from 'next-auth/client';
import { NextPage } from 'next';
import Layout from 'components/Layout';
import Container from 'components/Container';

const GOOGLE_PROVIDER_ID = 'google';

const Skeleton = () => <div>Loading...</div>;

const SignInCTA = () => (
  <div className="grid gap-3">
    <h1 className="h1">You are not signed in</h1>
    <a
      href="/api/auth/signin/Google"
      className="button-blue"
      onClick={(e) => {
        e.preventDefault();
        signIn(GOOGLE_PROVIDER_ID);
      }}
    >
      Sign in
    </a>
  </div>
);

const Profile = () => {
  const [session] = useSession();
  return (
    <div className="grid gap-3">
      <h1 className="h1">Your account</h1>
      <div className="flex items-center p-3 space-x-3 leading-none bg-gray-200 rounded-md">
        {session.user.image && (
          <span
            style={{
              backgroundImage: `url(${session.user.image})`,
            }}
            className="w-10 h-10 bg-white bg-cover rounded-full"
          />
        )}
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
    </div>
  );
};

const ProfileContent: React.FC = () => {
  const [session, loading] = useSession();

  if (!session && loading) return <Skeleton />;
  if (session) return <Profile />;
  return <SignInCTA />;
};

const Page: NextPage = () => {
  return (
    <Layout>
      <Container>
        <ProfileContent />
      </Container>
    </Layout>
  );
};

export default Page;
