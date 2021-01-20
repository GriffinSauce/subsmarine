import { signIn, signOut, useSession } from 'next-auth/client';
import Container from 'components/Container';
import Nav from 'components/Nav';

const GOOGLE_PROVIDER_ID = 'google';

const Header: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <header>
      <Container>
        {/* Set min-height to avoid page reflow while session loading */}
        <div className="min-h-10">
          <div
            className={`flex flex-row items-center justify-between w-full p-3 transition-all transform bg-gray-200 rounded-b-xl ${
              !session && loading ? '-translate-y-12 opacity-0' : ''
            }`}
          >
            {!session && (
              <>
                <span>You are not signed in</span>
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
              </>
            )}
            {session && (
              <>
                <div className="flex items-center space-x-3 leading-none">
                  {session.user.image && (
                    <span
                      style={{ backgroundImage: `url(${session.user.image})` }}
                      className="w-10 h-10 bg-white bg-cover rounded-full"
                    />
                  )}
                  <div>
                    <small>Signed in as</small>
                    <br />
                    <strong>{session.user.name}</strong>
                  </div>
                </div>
                <a
                  href="/api/auth/signout"
                  className="button-gray"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </div>
        </div>
        <Nav />
      </Container>
    </header>
  );
};

export default Header;
