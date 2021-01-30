import { useMediaQuery } from 'react-responsive';
import Header from 'components/Header';
import Footer from 'components/Footer';
import TabNavigation from 'components/TabNavigation';
import mergeClasses from 'utils/mergeClasses';

interface Props {
  fullHeight?: boolean;
  withFooter?: boolean;
}

const Layout: React.FC<Props> = ({
  fullHeight = false,
  withFooter = true,
  children,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <div
      className={mergeClasses(
        'flex flex-col',
        fullHeight ? 'max-h-screen' : 'min-h-screen',
      )}
    >
      {!isMobile && <Header />}
      <main className="flex flex-col flex-grow min-h-0">{children}</main>
      {withFooter && <Footer />}
      {isMobile && <TabNavigation />}
    </div>
  );
};

export default Layout;
