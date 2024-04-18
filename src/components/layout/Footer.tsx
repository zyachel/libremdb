import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from 'src/styles/modules/layout/footer.module.scss';

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
      <em className={styles.licence}>
        libremdb does not host any content. All content on libremdb is from IMDb. IMDb is a
        trademark of IMDb.com, Inc.
      </em>
    </footer>
  );
};

export default Footer;
