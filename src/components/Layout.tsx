import Header from 'components/Header';
import Footer from 'components/Footer';
import tailshake from 'tailshake';

interface Props {
  withFooter?: boolean;
  className?: string;
}

const Layout: React.FC<Props> = ({
  withFooter = true,
  className,
  children,
}) => {
  return (
    <div className={tailshake('flex flex-col', 'min-h-screen', className)}>
      <Header />
      <main className="flex flex-col flex-grow min-h-0">{children}</main>
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
