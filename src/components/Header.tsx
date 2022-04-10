import Link from 'next/link';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import Avatar from 'components/Avatar';
import Logo from 'components/Logo';
import tailshake from 'tailshake';
import { useUser } from '@auth0/nextjs-auth0';
import Container from './Container';
import ThemeButton from './ThemeButton';

const iconSize = 'w-8 h-8';

const MainLink = () => {
  const { user, isLoading } = useUser();
  return (
    <Link href={isLoading || user ? '/subs' : '/'}>
      <a
        className="flex h-full items-center justify-center space-x-2 py-3"
        aria-label="subs"
      >
        <div
          className={tailshake(
            iconSize,
            'flex items-center justify-center rounded-full bg-blue-100 bg-cover',
          )}
        >
          <Logo className="w-3/4" />
        </div>
        <span className="text-lg font-semibold dark:text-gray-50">
          Subsmarine
        </span>
      </a>
    </Link>
  );
};

const ProfileLink = () => (
  <Link href="/profile">
    <a
      className="flex h-full items-center justify-center py-3 pl-3"
      aria-label="profile"
    >
      <Avatar className={iconSize} />
    </a>
  </Link>
);

const SignupLink = () => (
  <a
    href="/api/auth/login"
    className="flex items-center justify-center space-x-1 p-3 text-lg font-semibold"
  >
    <AiOutlineThunderbolt />
    <span>Get started</span>
  </a>
);

const HeaderMobile: React.FC = () => {
  const { user, isLoading } = useUser();
  return (
    <div className="w-full border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <Container>
        <nav className="flex justify-between">
          <MainLink />
          <div className="flex items-center justify-between">
            <ThemeButton className={iconSize} />
            {isLoading || user ? <ProfileLink /> : <SignupLink />}
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default HeaderMobile;
