import type { AppProps } from 'next/app';
import usePageLoading from '../hooks/usePageLoading';
import ProgressBar from '../components/loaders/ProgressBar';
import ThemeProvider from '../context/theme-context';

import '../styles/main.scss';
import { useRouter } from 'next/router';

const ModifiedApp = ({ Component, pageProps }: AppProps) => {
  const { isPageLoading, key } = usePageLoading();

  return (
    <ThemeProvider>
      {isPageLoading && <ProgressBar />}
      <Component
        {...pageProps}
        key={key} /* passing key to force react to remound components */
      />
    </ThemeProvider>
  );
};

export default ModifiedApp;
