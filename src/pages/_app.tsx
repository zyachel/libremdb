import { useCallback, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import ProgressBar from '../components/loaders/ProgressBar';
import ThemeProvider from '../context/theme-context';

import '../styles/main.scss';

const ModifiedApp = ({ Component, pageProps }: AppProps) => {
  // for showing progress bar
  // could've used nprogress package, but didn't feel like it
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = useCallback(() => setIsLoading(true), []);
  const handleEnd = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleEnd);
    router.events.on('routeChangeError', handleEnd);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleEnd);
      router.events.off('routeChangeError', handleEnd);
    };
  }, [router, handleStart, handleEnd]);
  //

  return (
    <ThemeProvider>
      {isLoading && <ProgressBar />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default ModifiedApp;
