import { ReactNode } from 'react';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from '../styles/modules/layout/header.module.scss';
import ThemeToggler from '../components/buttons/ThemeToggler';

// const ThemeToggler = dynamic(
//   () => import('../components/buttons/ThemeToggler'),
//   { ssr: false }
// );

type Props = { full?: boolean; children?: ReactNode };

const Header = (props: Props) => {
  return (
    <header
      id='header'
      className={`${styles.header} ${props.full ? styles.header__about : ''}`}
    >
      <div className={styles.topbar}>
        <Link href='/about'>
          <a aria-label='go to homepage' className={styles.logo}>
            <svg
              className={styles.logo__icon}
              focusable='false'
              role='img'
              aria-hidden='true'
            >
              <use href='/svg/sprite.svg#icon-logo'></use>
            </svg>
            <span className={styles.logo__text}>libremdb</span>
          </a>
        </Link>
        {props.full && (
          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <a href='#features' className='link'>
                  Features
                </a>
              </li>
              <li className={styles.nav__item}>
                <a href='#faq' className='link'>
                  FAQs
                </a>
              </li>
              <li className={styles.nav__item}>
                <a href='https://github.com/zyachel/libremdb' className='link'>
                  Source
                </a>
              </li>
            </ul>
          </nav>
        )}
        <ThemeToggler className={styles.themeToggler} />
      </div>
      {props.full && (
        <div className={styles.hero}>
          <h1 className={`heading heading__primary ${styles.hero__text}`}>
            A free & open source IMDb front-end
          </h1>
          <p className={styles.hero__more}>
            inspired by projects like&nbsp;
            <a href='https://codeberg.org/teddit/teddit' className='link'>
              teddit
            </a>
            ,&nbsp;
            <a href='https://github.com/zedeus/nitter' className='link'>
              nitter
            </a>
            ,&nbsp; and&nbsp;
            <a
              href='https://github.com/digitalblossom/alternative-frontends'
              className='link'
            >
              many others
            </a>
            .
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
