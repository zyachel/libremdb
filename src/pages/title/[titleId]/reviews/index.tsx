import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Meta from 'src/components/meta/Meta';
import Layout from 'src/components/layout';
import ErrorInfo from 'src/components/error/ErrorInfo';
import { Filters, Reviews, TitleCard } from 'src/components/titleReviews';
import { AppError } from 'src/interfaces/shared/error';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import titleReviews from 'src/utils/fetchers/titleReviews';
import { cleanQueryStr, getErrorProperties, getProxiedIMDbImgUrl } from 'src/utils/helpers';
import { titleReviewsKey } from 'src/utils/constants/keys';
import styles from 'src/styles/modules/pages/titleReviews/titleReviews.module.scss';
import TitleReviews from 'src/interfaces/shared/titleReviews';
import { keys as titleReviewFiltersQueryKeys } from 'src/utils/constants/titleReviewsFilters';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

// TO-DO: make a wrapper page component to display errors, if present in props
const ReviewsPage = ({ data, error, originalPath }: Props) => {
  if (error) return <ErrorInfo {...error} originalPath={originalPath} />;

  return (
    <>
      <Meta
        title={data.meta.title}
        description={data.meta.title}
        imgUrl={data.meta?.image ? getProxiedIMDbImgUrl(data.meta.image) : undefined}
      />
      <Layout className={styles.container} originalPath={originalPath}>
        <TitleCard meta={data.meta} className={styles.card} />
        <Reviews list={data.list ?? []} className={styles.results} />
        <Filters titleId={data.meta.titleId} className={styles.form} />
      </Layout>
    </>
  );
};

// TO-DO: make a getServerSideProps wrapper for handling errors
type Data = ({ data: TitleReviews; error: null } | { error: AppError; data: null }) & {
  originalPath: string;
};
type Params = { titleId: string };

export const getServerSideProps: GetServerSideProps<Data, Params> = async ctx => {
  const titleId = ctx.params!.titleId;
  const originalPath = ctx.resolvedUrl;
  const queryParams = ctx.query as Record<string, string>;
  const queryStr = cleanQueryStr(queryParams, titleReviewFiltersQueryKeys);
  try {
    const data = await getOrSetApiCache(
      titleReviewsKey(titleId, queryStr, null),
      titleReviews,
      titleId,
      queryStr
    );

    return { props: { data, error: null, originalPath } };
  } catch (error) {
    const { message, statusCode } = getErrorProperties(error);
    ctx.res.statusCode = statusCode;
    ctx.res.statusMessage = message;

    return { props: { error: { message, statusCode }, data: null, originalPath } };
  }
};

export default ReviewsPage;
