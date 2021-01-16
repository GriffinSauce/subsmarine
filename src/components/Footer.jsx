import Link from 'next/link';
import styles from './Footer.module.css';
import Container from './Container';
import { version } from '../../package.json';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr />
      <Container>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <a href="https://github.com/GriffinSauce/letterbox">GitHub</a>
          </li>
          <li className={styles.navItem}>
            <Link href="/policy">
              <a>Policy</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <em>{version}</em>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
