import { ReactNode } from 'react';
import Link from 'next/link';
import Layout from 'src/layouts/Layout';
import Meta from 'src/components/meta/Meta';
import styles from 'src/styles/modules/components/error/error-info.module.scss';

// for details regarding the svg, go to sadgnu.svg file
// description copied verbatim from https://www.gnu.org/graphics/sventsitsky-sadgnu.html
// 404 idea from ninamori.org 404 page.

type Props = {
  message: string;
  statusCode?: number;
  // props specific to error boundary.
  misc?: {
    subtext: string;
    buttonText: string;
    buttonClickHandler: () => void;
  };
};

const ErrorInfo = ({ message, statusCode, misc }: Props) => {
  const title = statusCode ? `${message} (${statusCode})` : message;
  return (
    <>
      <Meta title={title} description='you encountered an error page!' />
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
          {title}
        </h1>
        {misc ? (
          <>
            <p>{misc.subtext}</p>
            <button className={styles.button} onClick={misc.buttonClickHandler}>
              {misc.buttonText}
            </button>
          </>
        ) : (
          <p>
            Go back to{' '}
            <Link href='/about'>
              <a className='link'>the homepage</a>
            </Link>
            .
          </p>
        )}
      </Layout>
    </>
  );
};
export default ErrorInfo;
