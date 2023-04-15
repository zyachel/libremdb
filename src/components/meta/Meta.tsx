import Head from 'next/head';
import { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  imgUrl?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? 'https://iket.me';

const Meta = ({
  title,
  description = 'libremdb, a free & open source IMDb front-end.',
  imgUrl = 'icon.svg',
}: Props) => {
  const url = new URL(imgUrl, BASE_URL);

  return (
    <Head>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <title key='title'>{`${title} | libremdb`}</title>
      <meta key='desc' name='description' content={description} />
      <link rel='icon' href='/favicon.ico' sizes='any' />
      <link rel='icon' href='/icon.svg' type='image/svg+xml' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <meta name='theme-color' content='#ffe5ef' />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='libremdb' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='video.movie' />
      <meta property='og:image' content={url.toString()} />
    </Head>
  );
};
export default Meta;
