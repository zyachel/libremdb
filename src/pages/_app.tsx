import type { AppProps } from 'next/app';
import usePageLoading from '../hooks/usePageLoading';
import ProgressBar from '../components/loaders/ProgressBar';
import ErrorBoundary from '../components/error/ErrorBoundary';
import ThemeProvider from '../context/theme-context';

import '../styles/main.scss';

const ModifiedApp = ({ Component, pageProps }: AppProps) => {
  const { isPageLoading, key } = usePageLoading();

  return (
    <ThemeProvider>
      {isPageLoading && <ProgressBar />}
      <ErrorBoundary>
        <Component
          {...pageProps}
          key={key} /* passing key to force react to remount components */
        />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default ModifiedApp;
