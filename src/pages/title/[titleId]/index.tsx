// external
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
// local
import Meta from '../../../components/meta/Meta';
import Layout from '../../../layouts/Layout';
import ErrorInfo from '../../../components/error/ErrorInfo';
import {
  Basic,
  Cast,
  DidYouKnow,
  Info,
  Media,
  MoreLikeThis,
  Reviews,
} from '../../../components/title';
// misc
import Title from '../../../interfaces/shared/title';
import { AppError } from '../../../interfaces/shared/error';
import title from '../../../utils/fetchers/title';
import { getProxiedIMDbImgUrl } from '../../../utils/helpers';
// styles
import styles from '../../../styles/modules/pages/title/title.module.scss';

type Props = { data: Title; error: null } | { error: AppError; data: null };

// TO-DO: make a wrapper page component to display errors, if present in props
const TitleInfo = ({ data, error }: Props) => {
  if (error)
    return <ErrorInfo message={error.message} statusCode={error.statusCode} />;

  const info = {
    meta: data.meta,
    keywords: data.keywords,
    details: data.details,
    boxOffice: data.boxOffice,
    technicalSpecs: data.technicalSpecs,
    accolades: data.accolades,
  };

  return (
    <>
      <Meta
        title={`${data.basic.title} (${
          data.basic.releaseYear?.start || data.basic.type.name
        })`}
        description={data.basic.plot || undefined}
      />
      <Head>
        <meta
          title="og:image"
          content={
            data.basic.poster?.url
              ? getProxiedIMDbImgUrl(data.basic.poster?.url)
              : '/icon-512.png'
          }
        />
      </Head>
      <Layout className={styles.title}>
        <Basic data={data.basic} className={styles.basic} />
        <Media className={styles.media} media={data.media} />
        <Cast className={styles.cast} cast={data.cast} />
        <div className={styles.textarea}>
          <DidYouKnow data={data.didYouKnow} />
          <Reviews reviews={data.reviews} />
        </div>
        <Info className={styles.infoarea} info={info} />
        <MoreLikeThis className={styles.related} data={data.moreLikeThis} />
      </Layout>
    </>
  );
};

// TO-DO: make a getServerSideProps wrapper for handling errors
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const titleId = ctx.params!.titleId as string

  try {
    const data = await title(titleId)

    return { props: { data, error: null } }
  } catch (error: any) {
    const { message, statusCode } = error
    ctx.res.statusCode = statusCode
    ctx.res.statusMessage = message

    return { props: { error: { message, statusCode }, data: null } }
  }
}

export default TitleInfo

// could've used getStaticProps instead of getServerSideProps, but meh.
/*
export const getStaticProps: GetStaticProps = async ctx => {
  const titleId = ctx.params!.titleId as string;
  try {
    const data = await title(titleId);

    return {
      props: { data, error: null },
      revalidate: 60 * 60 * 24, // 1 day
    };
  } catch (error) {
    // console.log(error);

    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { titleId: 'tt0133093' } }],
    fallback: 'blocking',
  };
};
*/
