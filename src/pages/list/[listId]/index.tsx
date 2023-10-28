import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Meta from 'src/components/meta/Meta';
import Layout from 'src/components/layout';
import ErrorInfo from 'src/components/error/ErrorInfo';
import { Data, Meta as ListMeta, Pagination } from 'src/components/list';
import { AppError } from 'src/interfaces/shared/error';
import TList from 'src/interfaces/shared/list';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import list from 'src/utils/fetchers/list';
import { listKey } from 'src/utils/constants/keys';
import styles from 'src/styles/modules/pages/list/list.module.scss';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const List = ({ data, error, originalPath }: Props) => {
  if (error) return <ErrorInfo {...error} originalPath={originalPath} />;

  const description = data.description || `List created by ${data.meta.by.name} (${data.meta.num} ${data.meta.type}).`

  return (
    <>
      <Meta title={data.title} description={description} />
      <Layout className={styles.list} originalPath={originalPath}>
        <ListMeta title={data.title} description={data.description} meta={data.meta} />
        {/* @ts-expect-error don't have time to fix it. just a type fluff. */}
        <Data data={data.data} />
        <Pagination pagination={data.pagination} />
      </Layout>
    </>
  );
};

type TData = ({ data: TList; error: null } | { error: AppError; data: null }) & {
  originalPath: string;
};
type Params = { listId: string };

export const getServerSideProps: GetServerSideProps<TData, Params> = async ctx => {
  const listId = ctx.params!.listId;
  const pageNum = (ctx.query.page as string | undefined) ?? '1';
  const originalPath = ctx.resolvedUrl;
  try {
    const data = await getOrSetApiCache(listKey(listId, pageNum), list, listId, pageNum);

    return { props: { data, error: null, originalPath } };
  } catch (error: any) {
    const { message = 'Internal server error', statusCode = 500 } = error;
    ctx.res.statusCode = statusCode;
    ctx.res.statusMessage = message;
    return { props: { error: { message, statusCode }, data: null, originalPath } };
  }
};

export default List;
