import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/modules/layout/footer.module.scss';

const links = [
  { path: '/about', text: 'About' },
  { path: '/find', text: 'Find' },
  { path: '/privacy', text: 'Privacy' },
  { path: '/contact', text: 'Contact' },
] as const;

const Footer = () => {
  const { pathname } = useRouter();

  return (
    <footer id='footer' className={styles.footer}>
      <nav aria-label='primary navigation' className={styles.nav}>
        <ul className={styles.list}>
          {links.map(link => (
            <li className={styles.nav__item} key={link.path}>
              <Link href={link.path}>
                <a
                  className={styles.nav__link}
                  aria-current={pathname === link.path ? 'page' : undefined}
                >
                  {link.text}
                </a>
              </Link>
            </li>
          ))}
          <li className={styles.nav__item}>
            <a href='#' className={styles.nav__link}>
              Back to top
            </a>
          </li>
        </ul>
      </nav>
      <p className={styles.licence}>
        Licensed under{' '}
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
