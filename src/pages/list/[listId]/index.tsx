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
import { getErrorProperties } from 'src/utils/helpers';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const List = ({ data, error, originalPath }: Props) => {
  if (error) return <ErrorInfo {...error} originalPath={originalPath} />;

  const description =
    data.meta.description ||
    `List created by ${data.meta.by.name} (${data.meta.num} ${data.type.toLowerCase()}).`;

  return (
    <>
      <Meta title={data.meta.title ?? ''} description={description} />
      <Layout className={styles.list} originalPath={originalPath}>
        <ListMeta meta={data.meta} />
        <Data data={data.data} kind={data.type} />
        <Pagination pagination={data.pagination} listId={data.meta.id} />
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
  } catch (error) {
    const err = getErrorProperties(error);
    ctx.res.statusCode = err.statusCode;
    ctx.res.statusMessage = err.message;
    return { props: { error: { message: err.message, statusCode: err.statusCode, stack: err.format() }, data: null, originalPath } };
  }
};

export default List;
