import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ErrorInfo from 'src/components/error/ErrorInfo';

const error = {
  statusCode: 404,
  message: 'Not found, sorry.',
} as const;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Error404 = ({ originalPath }: Props) => {
  return <ErrorInfo {...error} originalPath={originalPath} />;
};

export default Error404;

type Data = { originalPath: string };
type Params = { error: string[] };

export const getServerSideProps: GetServerSideProps<Data, Params> = async ctx => {
  ctx.res.statusCode = error.statusCode;
  ctx.res.statusMessage = error.message;

  return { props: { originalPath: ctx.resolvedUrl } };
};
