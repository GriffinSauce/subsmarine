import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul className="py-3 space-x-3">
        <li className="inline-block text-blue-700">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="inline-block text-blue-700">
          <Link href="/stack">
            <a>Stack</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
