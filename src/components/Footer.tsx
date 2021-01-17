import Link from 'next/link';
import Container from 'components/Container';
import { version } from '../../package.json';

const Footer: React.FC = () => {
  return (
    <footer className="mt-6">
      <hr />
      <Container>
        <ul className="py-3 space-x-3">
          <li className="inline-block text-blue-700">
            <a href="https://github.com/GriffinSauce/letterbox">GitHub</a>
          </li>
          <li className="inline-block text-blue-700">
            <Link href="/policy">
              <a>Policy</a>
            </Link>
          </li>
          <li className="inline-block italic text-blue-700">v{version}</li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
