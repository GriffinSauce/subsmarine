import Header from 'components/Header';
import Footer from 'components/Footer';
import mergeClasses from 'utils/mergeClasses';

interface Props {
  fullHeight?: boolean;
}

const Layout: React.FC<Props> = ({ fullHeight = false, children }) => {
  return (
    <div
      className={mergeClasses('flex flex-col', fullHeight && 'max-h-screen')}
    >
      <Header />
      <main className="flex flex-col min-h-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
