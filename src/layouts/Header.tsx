import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ThemeToggler from '../components/buttons/ThemeToggler';

import styles from '../styles/modules/layout/header.module.scss';

type Props = { full?: boolean; children?: ReactNode };

const Header = (props: Props) => {
  const { asPath: path } = useRouter();

  return (
    <header
      id='header'
      className={`${styles.header} ${props.full ? styles.header__about : ''}`}
    >
      <div className={styles.topbar}>
        <Link href='/'>
          <a aria-label='go to homepage' className={styles.logo}>
            <svg className={styles.logo__icon} role='img' aria-hidden>
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
        <div className={styles.misc}>
          <a
            href={`https://www.imdb.com${path}`}
            target='_blank'
            rel='noreferrer'
          >
            <span className='visually-hidden'>
              View on IMDb (opens in new tab)
            </span>
            <svg className='icon' role='img' aria-hidden>
              <use href='/svg/sprite.svg#icon-external-link'></use>
            </svg>
          </a>
          <Link href='/find'>
            <a>
              <span className='visually-hidden'>Search</span>
              <svg className='icon' role='img' aria-hidden>
                <use href='/svg/sprite.svg#icon-search'></use>
              </svg>
            </a>
          </Link>
          <ThemeToggler className={styles.themeToggler} />
        </div>
      </div>
      {props.full && (
        <div className={styles.hero}>
          <h1 className={`heading heading__primary ${styles.hero__text}`}>
            A free & open source IMDb front-end
          </h1>
          <p className={styles.hero__more}>
            inspired by projects like{' '}
            <a href='https://codeberg.org/teddit/teddit' className='link'>
              teddit
            </a>
            ,{' '}
            <a href='https://github.com/zedeus/nitter' className='link'>
              nitter
            </a>
            , and{' '}
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
