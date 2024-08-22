import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from 'src/components/layout';
import ErrorInfo from 'src/components/error/ErrorInfo';
import Meta from 'src/components/meta/Meta';
import Results from 'src/components/find';
import Form from 'src/components/forms/find';
import Find, { FindQueryParams } from 'src/interfaces/shared/search';
import { AppError } from 'src/interfaces/shared/error';
import basicSearch from 'src/utils/fetchers/basicSearch';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { cleanQueryStr, getErrorProperties } from 'src/utils/helpers';
import { findKey } from 'src/utils/constants/keys';
import styles from 'src/styles/modules/pages/find/find.module.scss';
import { findFilterable } from 'src/utils/constants/find';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const getMetadata = (title: string | null) => ({
  title: title || 'Search',
  description: title
    ? `results for '${title}'`
    : 'Search for anything on libremdb, a free & open source IMDb front-end',
});

const BasicSearch = ({ data: { title, results }, error, originalPath }: Props) => {
  if (error) return <ErrorInfo {...error} originalPath={originalPath} />;

  let layoutClassName = styles.find;
  if (!title) layoutClassName += ' ' + styles.find__home;

  return (
    <>
      <Meta {...getMetadata(title)} />
      <Layout className={layoutClassName} originalPath={originalPath}>
        {title && ( // only showing when user has searched for something
          <Results results={results} title={title} className={styles.results} />
        )}
        <Form className={styles.form} />
      </Layout>
    </>
  );
};

// TODO: use generics for passing in queryParams(to components) for better type-checking.
type Data = (
  | { data: { title: string; results: Find }; error: null }
  | { data: { title: null; results: null }; error: null }
  | { data: { title: string; results: null }; error: AppError }
) & {
  originalPath: string;
};

export const getServerSideProps: GetServerSideProps<Data, FindQueryParams> = async ctx => {
  // sample query str: find/?q=babylon&s=tt&ttype=ft&exact=true
  const queryObj = ctx.query as FindQueryParams;
  const query = queryObj.q?.trim();
  const originalPath = ctx.resolvedUrl;

  if (!query) return { props: { data: { title: null, results: null }, error: null, originalPath } };

  try {
    const queryStr = cleanQueryStr(queryObj, findFilterable);

    const res = await getOrSetApiCache(findKey(queryStr), basicSearch, queryStr);

    return {
      props: { data: { title: query, results: res }, error: null, originalPath },
    };
  } catch (error) {
    const { message, statusCode } = getErrorProperties(error);
    ctx.res.statusCode = statusCode;
    ctx.res.statusMessage = message;

    return {
      props: {
        error: { message, statusCode },
        data: { title: query, results: null },
        originalPath,
      },
    };
  }
};

export default BasicSearch;
