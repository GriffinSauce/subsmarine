import Link from 'next/link';
import { useSession, signIn } from 'next-auth/client';
import { FiLayers, FiZap } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import Container from 'components/Container';
import Logo from 'components/Logo';
import Avatar from 'components/Avatar';
import { AuthProviderId } from 'types/auth';

const ProfileLink = ({ user }) => (
  <Link href="/profile">
    <a className="flex items-center px-4 py-3 space-x-3 leading-none bg-white rounded-xl">
      <Avatar className="w-8 h-8" />
      <div>
        <small>{user ? 'Signed in as' : <Skeleton width={100} />}</small>
        <br />
        <strong>{user?.name || <Skeleton width={120} />}</strong>
      </div>
    </a>
  </Link>
);
const SignupLink = ({ user }) => (
  <Link href="/profile">
    <a
      className="flex items-center justify-center px-4 py-3 space-x-2 text-lg font-semibold bg-white rounded-xl"
      href="/api/auth/signin/Google"
      onClick={(e) => {
        e.preventDefault();
        signIn(AuthProviderId.Google);
      }}
    >
      <FiZap />
      <span>Get started</span>
    </a>
  </Link>
);

const Header: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <header className="hidden py-2 bg-gray-100 border-b border-gray-200 lg:block">
      <Container>
        <nav>
          <ul className="flex flex-row items-center justify-between w-full space-x-3">
            <li>
              <Link href="/">
                <a className="flex items-center justify-center px-4 py-3 space-x-2 text-lg font-semibold bg-white rounded-xl">
                  <Logo className="h-6" />
                  <span>Subsmarine</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/subs">
                <a className="flex items-center justify-center px-4 py-3 space-x-2 text-lg font-semibold bg-white rounded-xl">
                  <FiLayers />
                  <span>Subs</span>
                </a>
              </Link>
            </li>
            <li className="flex justify-end flex-grow">
              {loading || session ? (
                <ProfileLink user={session?.user} />
              ) : (
                <SignupLink />
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
