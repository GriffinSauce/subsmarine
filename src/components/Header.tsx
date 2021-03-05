import Link from 'next/link';
import { useSession, signIn } from 'next-auth/client';
import { FiLayers, FiZap } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import Container from 'components/Container';
import Logo from 'components/Logo';
import Avatar from 'components/Avatar';
import { AuthProviderId } from 'types/auth';

type AnchorProps = React.HTMLProps<HTMLLinkElement>;
const HeaderLink: React.FC<AnchorProps> = ({ children }) => {
  return (
    <a className="flex items-center justify-center px-4 py-3 space-x-2 text-lg font-semibold bg-white dark:bg-gray-800 rounded-xl">
      {children}
    </a>
  );
};

const ProfileLink = () => {
  const [session] = useSession();
  return (
    <Link href="/profile">
      <a className="flex items-center px-4 py-3 space-x-3 leading-none bg-white dark:bg-gray-800 rounded-xl">
        <Avatar className="w-8 h-8" />
        <div>
          <small>
            {session?.user ? 'Signed in as' : <Skeleton width={100} />}
          </small>
          <br />
          <strong>{session?.user?.name || <Skeleton width={120} />}</strong>
        </div>
      </a>
    </Link>
  );
};

const SignupLink = () => (
  <Link href="/profile">
    <HeaderLink
      href="/api/auth/signin/Google"
      onClick={(e) => {
        e.preventDefault();
        signIn(AuthProviderId.Google);
      }}
    >
      <FiZap />
      <span>Get started</span>
    </HeaderLink>
  </Link>
);

const Header: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <header className="hidden py-2 bg-gray-100 border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:block">
      <Container>
        <nav>
          <ul className="flex flex-row items-center justify-between w-full space-x-3">
            <li>
              <Link href="/">
                <HeaderLink>
                  <Logo className="h-6" />
                  <span>Subsmarine</span>
                </HeaderLink>
              </Link>
            </li>
            <li>
              <Link href="/subs">
                <HeaderLink>
                  <FiLayers />
                  <span>Subs</span>
                </HeaderLink>
              </Link>
            </li>
            <li className="flex justify-end flex-grow">
              {loading || session ? <ProfileLink /> : <SignupLink />}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
