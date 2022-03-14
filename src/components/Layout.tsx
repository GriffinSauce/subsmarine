import Header from 'components/Header';
import Footer from 'components/Footer';
import TabNavigation from 'components/TabNavigation';
import tailshake from 'tailshake';

interface Props {
  fullHeight?: boolean;
  withFooter?: boolean;
}

const Layout: React.FC<Props> = ({
  fullHeight = false,
  withFooter = true,
  children,
}) => {
  return (
    <div
      className={tailshake(
        'flex flex-col',
        fullHeight ? 'min-h-screen lg:max-h-screen' : 'min-h-screen',
      )}
    >
      <Header />
      <main className="flex flex-col flex-grow min-h-0">{children}</main>
      {withFooter && <Footer />}
      <TabNavigation />
    </div>
  );
};

export default Layout;
