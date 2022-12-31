import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/modules/layout/footer.module.scss';

const Footer: FC = () => {
  const { pathname } = useRouter();
  const className = (link: string) =>
    pathname === link ? styles.nav__linkActive : styles.nav__link;

  return (
    <footer id='footer' className={styles.footer}>
      <nav aria-label='primary navigation' className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.nav__item}>
            <Link href='/about'>
              <a className={className('/about')}>About</a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href='/find'>
              <a className={className('/find')}>Search</a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href='/privacy'>
              <a className={className('/privacy')}>Privacy</a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href='/contact'>
              <a className={className('/contact')}>Contact</a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <a href='#' className={styles.nav__link}>
              Back to top
            </a>
          </li>
        </ul>
      </nav>
      <p className={styles.licence}>
        Licensed under&nbsp;
        <a
          className={styles.nav__link}
          href='https://www.gnu.org/licenses/agpl-3.0-standalone.html'
        >
          GNU AGPLv3
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
