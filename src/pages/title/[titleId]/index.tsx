// external
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
// local
import Meta from '../../../components/Meta/Meta'
import Layout from '../../../layouts/Layout'
import title from '../../../utils/fetchers/title'
// components
import ErrorInfo from '../../../components/Error/ErrorInfo'
import Basic from '../../../components/title/Basic'
import Media from '../../../components/title/Media'
import Cast from '../../../components/title/Cast'
import DidYouKnow from '../../../components/title/DidYouKnow'
import Info from '../../../components/title/Info'
import Reviews from '../../../components/title/Reviews'
import MoreLikeThis from '../../../components/title/MoreLikeThis'
// misc
import Title from '../../../interfaces/shared/title'
import { AppError } from '../../../interfaces/shared/error'
// styles
import styles from '../../../styles/modules/pages/title/title.module.scss'
import Head from 'next/head'
import { getProxiedIMDbImgUrl } from '../../../utils/helpers'

type Props = { data: Title; error: null } | { error: AppError; data: null }

// TO-DO: make a wrapper page component to display errors, if present in props
const TitleInfo = ({ data, error }: Props) => {
  const router = useRouter()

  if (error)
    return <ErrorInfo message={error.message} statusCode={error.statusCode} />

  const info = {
    meta: data.meta,
    keywords: data.keywords,
    details: data.details,
    boxOffice: data.boxOffice,
    technicalSpecs: data.technicalSpecs,
    accolades: data.accolades,
  }

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
        <Media className={styles.media} media={data.media} router={router} />
        <Cast className={styles.cast} cast={data.cast} />
        <div className={styles.textarea}>
          <DidYouKnow data={data.didYouKnow} />
          <Reviews reviews={data.reviews} router={router} />
        </div>
        <Info className={styles.infoarea} info={info} router={router} />
        <MoreLikeThis className={styles.related} data={data.moreLikeThis} />
      </Layout>
    </>
  )
}

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
