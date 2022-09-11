import Link from 'next/link';
import Layout from '../../layouts/Layout';
import Meta from '../Meta/Meta';

import styles from '../../styles/modules/components/error/error-info.module.scss';

// for details regarding the svg, go to sadgnu.svg file
// description copied verbatim from https://www.gnu.org/graphics/sventsitsky-sadgnu.html
// 404 idea from ninamori.org 404 page.

const ErrorInfo = ({ message = 'Not found, sorry.', statusCode = 404 }) => {
  return (
    <>
      <Meta
        title={`${message} (${statusCode})`}
        description='you encountered an error page!'
      />
      <Layout className={styles.error}>
        <svg
          className={styles.gnu}
          focusable='false'
          role='img'
          aria-labelledby='gnu-title gnu-desc'
        >
          <title id='gnu-title'>GNU and Tux</title>
          <desc id='gnu-desc'>
            A pencil drawing of a big gnu and a small penguin, both very sad.
            GNU is despondently sitting on a bench, and Tux stands beside him,
            looking down and patting him on the back.
          </desc>
          <use href='/svg/sadgnu.svg#sad-gnu'></use>
        </svg>
        <h1 className={`heading heading__primary ${styles.heading}`}>
          <span>{message}</span>
          <span> ({statusCode})</span>
        </h1>
        <p className={styles.back}>
          Go back to{' '}
          <Link href='/about'>
            <a className='link'>the homepage</a>
          </Link>
          .
        </p>
      </Layout>
    </>
  );
};
export default ErrorInfo;
