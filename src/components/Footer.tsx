import Link from 'next/link';
import Container from 'components/Container';
import { version } from '../../package.json';

const Footer: React.FC = () => {
  return (
    <footer className="italic text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
      <hr className="dark:border-gray-700" />
      <Container>
        <ul className="py-1 space-x-4 text-right">
          <li className="inline-block">
            <a href="https://github.com/GriffinSauce/subsmarine">GitHub</a>
          </li>
          <li className="inline-block">
            <Link href="/policy">
              <a>Policy</a>
            </Link>
          </li>
          <li className="inline-block">v{version}</li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
