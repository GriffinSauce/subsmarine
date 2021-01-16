import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import Container from './Container';
import styles from './Header.module.css';

const GOOGLE_PROVIDER_ID = 'google';

const Header = () => {
  const [session, loading] = useSession();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <Container>
        <div className={styles.signedInStatus}>
          <p
            className={`nojs-show ${
              !session && loading ? styles.loading : styles.loaded
            }`}
          >
            {!session && (
              <>
                <span className={styles.notSignedInText}>
                  You are not signed in
                </span>
                <a
                  href="/api/auth/signin/Google"
                  className={styles.buttonPrimary}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn(GOOGLE_PROVIDER_ID);
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session && (
              <>
                {session.user.image && (
                  <span
                    style={{ backgroundImage: `url(${session.user.image})` }}
                    className={styles.avatar}
                  />
                )}
                <span className={styles.signedInText}>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email || session.user.name}</strong>
                </span>
                <a
                  href="/api/auth/signout"
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </p>
        </div>
        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/stack">
                <a>Stack</a>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
