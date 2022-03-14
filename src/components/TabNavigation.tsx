import Link from 'next/link';
import Avatar from 'components/Avatar';
import Logo from 'components/Logo';
import tailshake from 'tailshake';

const iconSize = 'w-8 h-8';

const FixedPlaceholder = () => (
  <div className="p-3">
    <div className={iconSize} />
  </div>
);

const TabNavigation: React.FC = () => {
  return (
    <div className="lg:hidden">
      <FixedPlaceholder />
      <div className="fixed bottom-0 w-full bg-white dark:bg-gray-800">
        <hr className="dark:border-gray-700" />
        <ul className="grid grid-cols-2">
          <li>
            <Link href="/subs">
              <a className="flex items-center justify-center h-full p-3 space-x-2">
                <div
                  className={tailshake(
                    iconSize,
                    'flex items-center justify-center bg-blue-100 bg-cover rounded-full',
                  )}
                >
                  <Logo className="w-3/4" />
                </div>
                <span className="font-semibold text-gray-500 dark:text-gray-50">
                  Subs
                </span>
              </a>
            </Link>
          </li>
          <li className="border-l border-gray-100 dark:border-gray-700">
            <Link href="/profile">
              <a className="flex items-center justify-center h-full p-3 space-x-2">
                <Avatar className={iconSize} />
                <span className="font-semibold text-gray-500 dark:text-gray-50">
                  Profile
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabNavigation;
