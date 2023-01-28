import { AppProps } from 'next/app';
import ProgressBar from 'src/components/loaders/ProgressBar';
import ErrorBoundary from 'src/components/error/ErrorBoundary';
import ThemeProvider from 'src/context/theme-context';
import usePageLoading from 'src/hooks/usePageLoading';
import 'src/styles/main.scss';

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
