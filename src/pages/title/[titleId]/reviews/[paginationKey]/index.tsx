import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Meta from 'src/components/meta/Meta';
import Layout from 'src/components/layout';
import ErrorInfo from 'src/components/error/ErrorInfo';
import { BasicCard, Filters, Pagination, Reviews } from 'src/components/titleReviews';
import { AppError } from 'src/interfaces/shared/error';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { cursoredReviews } from 'src/utils/fetchers/titleReviews';
import { cleanQueryStr, getErrorProperties } from 'src/utils/helpers';
import { titleReviewsKey } from 'src/utils/constants/keys';
import styles from 'src/styles/modules/pages/titleReviews/titleReviews.module.scss';
import { TitleReviewsCursored } from 'src/interfaces/shared/titleReviews';
import { keys as titleReviewsQueryKeys } from 'src/utils/constants/titleReviewsFilters';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const CursoredReviewsPage = ({ data, error, originalPath }: Props) => {
  if (error) return <ErrorInfo {...error} originalPath={originalPath} />;

  return (
    <>
      <Meta
        title={data.meta.title ?? 'User Reviews'}
        description={data.meta.title ?? 'User Reviews'}
      />
      <Layout className={styles.container} originalPath={originalPath}>
        <BasicCard meta={data.meta} className={styles.card} />
        <Reviews list={data.list} className={styles.results}>
          <Pagination meta={data.meta} cursor={data.cursor} />
        </Reviews>
        <Filters titleId={data.meta.titleId} className={styles.form} />
      </Layout>
    </>
  );
};

// TO-DO: make a getServerSideProps wrapper for handling errors
type Data = ({ data: TitleReviewsCursored; error: null } | { error: AppError; data: null }) & {
  originalPath: string;
};
type Params = { titleId: string; paginationKey: string };

export const getServerSideProps: GetServerSideProps<Data, Params> = async ctx => {
  const titleId = ctx.params!.titleId;
  const paginationKey = ctx.params!.paginationKey;
  const title = ctx.query.title as string | null;

  const originalPath = `/title/${titleId}/reviews/_ajax?paginationKey=${paginationKey}`;
  const queryObj = ctx.query as Record<string, string>;
  const queryStr = cleanQueryStr(queryObj, titleReviewsQueryKeys);

  try {
    const data = await getOrSetApiCache(
      titleReviewsKey(titleId, queryStr, paginationKey),
      cursoredReviews,
      titleId,
      paginationKey,
      queryStr,
      title
    );

    return { props: { data, error: null, originalPath } };
  } catch (error) {
    const { message, statusCode } = getErrorProperties(error);
    ctx.res.statusCode = statusCode;
    ctx.res.statusMessage = message;

    return { props: { error: { message, statusCode }, data: null, originalPath } };
  }
};

export default CursoredReviewsPage;
