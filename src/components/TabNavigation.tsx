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

      <div className="relative inline-flex justify-center px-0 py-3 m-0 border-none rounded-none outline-none cursor-pointer bg-none font-default color-blue-500">
        {/* content */}
      </div>
    </div>
  );
};

const tabStyles = ({ theme }) => css`
  transition: box-shadow 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
  flex: 2;

  &:hover {
    background-color: ${theme.colors.tabBg};
    border-radius: 0;
  }
  padding: ${theme.layout.spacing.s500}px 0;
  text-transform: none;
  font-weight: ${theme.fonts.weight.lg};
  font-size: ${theme.fonts.size.md};
  line-height: ${theme.fonts.lineHeight.lg};

  border-left: solid 1px ${theme.colors.tabBorder};
  :first-of-type {
    border-left: none;
  }
  ${mq.tabletSm(css`
    flex: none;
    margin-right: ${theme.layout.spacing.s600}px;
    justify-content: unset;
    font-weight: 500;
    padding: ${theme.layout.spacing.s500}px ${theme.layout.spacing.s400}px;
    border-radius: ${theme.layout.spacing.s100}px;
    color: ${theme.colors.tabDesktop};
    text-transform: none;
    line-height: ${theme.fonts.lineHeight.sm};
    border: none;
  `)};
`;

export default TabNavigation;
