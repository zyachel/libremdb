import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Meta from 'src/components/meta/Meta';
import Layout from 'src/components/layout';
import ErrorInfo from 'src/components/error/ErrorInfo';
import Media from 'src/components/media/Media';
import { Basic, Credits, DidYouKnow, Info, Bio, KnownFor } from 'src/components/name';
import Name from 'src/interfaces/shared/name';
import { AppError } from 'src/interfaces/shared/error';
import name from 'src/utils/fetchers/name';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { getErrorProperties, getProxiedIMDbImgUrl } from 'src/utils/helpers';
import { nameKey } from 'src/utils/constants/keys';
import styles from 'src/styles/modules/pages/name/name.module.scss';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NameInfo = ({ data, error, originalPath }: Props) => {
  if (error) return <ErrorInfo {...error} originalPath={originalPath} />;

  return (
    <>
      <Meta
        title={data.basic.name}
        description={data.basic.bio.short + '...'}
        imgUrl={data.basic.poster?.url && getProxiedIMDbImgUrl(data.basic.poster.url)}
      />
      <Layout className={styles.name} originalPath={originalPath}>
        <Basic data={data.basic} className={styles.basic} />
        <Media className={styles.media} media={data.media} />
        <div className={styles.textarea}>
          <KnownFor data={data.knownFor} />
          <Bio bio={data.basic.bio.full} />
        </div>
        <div className={styles.infoarea}>
          <Info info={data.personalDetails} accolades={data.accolades} />
          <DidYouKnow data={data.didYouKnow} />
        </div>
        <Credits className={styles.credits} data={data.credits} />
      </Layout>
    </>
  );
};

type Data = ({ data: Name; error: null } | { error: AppError; data: null }) & {
  originalPath: string;
};
type Params = { nameId: string };

export const getServerSideProps: GetServerSideProps<Data, Params> = async ctx => {
  const nameId = ctx.params!.nameId;
  const originalPath = ctx.resolvedUrl;

  try {
    const data = await getOrSetApiCache(nameKey(nameId), name, nameId);

    return { props: { data, error: null, originalPath } };
  } catch (error) {
    const err = getErrorProperties(error);
    ctx.res.statusCode = err.statusCode;
    ctx.res.statusMessage = err.message;

    return {
      props: {
        error: { message: err.message, statusCode: err.statusCode, stack: err.format() },
        data: null,
        originalPath,
      },
    };
  }
};

export default NameInfo;
