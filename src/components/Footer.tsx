import { AiOutlineBulb } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import Link from 'next/link';
import Container from 'components/Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <Container>
        <div className="space-x-4 py-1">
          <a
            rel="noopener noreferrer"
            target="_blank"
            className="space-x-0.5"
            href="https://github.com/GriffinSauce/subsmarine"
          >
            <FiGithub className="inline-block" />
            <span className="align-middle">GitHub</span>
          </a>
          <Link href="/about">
            <a className="space-x-0.5">
              <AiOutlineBulb className="inline-block" />
              <span className="align-middle">About</span>
            </a>
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
