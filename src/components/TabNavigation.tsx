import Link from 'next/link';
import Avatar from 'components/Avatar';
import Logo from 'components/Logo';
import mergeClasses from 'utils/mergeClasses';

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
      <div className="fixed bottom-0 w-full bg-white">
        <hr />
        <ul className="grid grid-cols-2">
          <li>
            <Link href="/subs">
              <a className="flex items-center justify-center h-full p-3 space-x-2">
                <div
                  className={mergeClasses(
                    iconSize,
                    'flex items-center justify-center bg-blue-100 bg-cover rounded-full',
                  )}
                >
                  <Logo className="w-3/4" />
                </div>
                <span className="font-semibold text-gray-500">Subs</span>
              </a>
            </Link>
          </li>
          <li className="border-l border-gray-100">
            <Link href="/profile">
              <a className="flex items-center justify-center h-full p-3 space-x-2">
                <Avatar className={iconSize} />
                <span className="font-semibold text-gray-500">Profile</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabNavigation;
