import { GetServerSideProps } from 'next';

import Layout from '../../layouts/Layout';
import ErrorInfo from '../../components/error/ErrorInfo';
import Meta from '../../components/meta/Meta';
import Results from '../../components/find';
import basicSearch from '../../utils/fetchers/basicSearch';
import Form from '../../components/forms/find';

import Find, { FindQueryParams } from '../../interfaces/shared/search';
import { AppError } from '../../interfaces/shared/error';
import { cleanQueryStr } from '../../utils/helpers';

import styles from '../../styles/modules/pages/find/find.module.scss';

type Props =
  | { data: { title: string; results: Find }; error: null }
  | { data: { title: null; results: null }; error: null }
  | { data: { title: string; results: null }; error: AppError };

const getMetadata = (title: string | null) => ({
  title: title || 'Search',
  description: title
    ? `results for '${title}'`
    : 'Search for anything on libremdb, a free & open source IMDb front-end',
});

const BasicSearch = ({ data: { title, results }, error }: Props) => {
  if (error)
    return <ErrorInfo message={error.message} statusCode={error.statusCode} />;

  return (
    <>
      <Meta {...getMetadata(title)} />
      <Layout className={`${styles.find} ${!title && styles.find__home}`}>
        {title && ( // only showing when user has searched for something
          <Results results={results} title={title} className={styles.results} />
        )}
        <Form className={styles.form} />
      </Layout>
    </>
  );
};

// TODO: use generics for passing in queryParams(to components) for better type-checking.
export const getServerSideProps: GetServerSideProps = async ctx => {
  // sample query str: find/?q=babylon&s=tt&ttype=ft&exact=true
  const queryObj = ctx.query as FindQueryParams;
  const query = queryObj.q?.trim();

  if (!query)
    return { props: { data: { title: null, results: null }, error: null } };

  try {
    const entries = Object.entries(queryObj);
    const queryStr = cleanQueryStr(entries);

    const res = await basicSearch(queryStr);

    return {
      props: { data: { title: query, results: res }, error: null },
    };
  } catch (error: any) {
    const { message, statusCode } = error;
    ctx.res.statusCode = statusCode;
    ctx.res.statusMessage = message;

    return {
      props: {
        error: { message, statusCode },
        data: { title: query, results: null },
      },
    };
  }
};

export default BasicSearch;
