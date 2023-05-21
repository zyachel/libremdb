import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Meta from 'src/components/meta/Meta';
import Layout from 'src/layouts/Layout';
import ErrorInfo from 'src/components/error/ErrorInfo';
import Media from 'src/components/media/Media';
import { Basic, Credits, DidYouKnow, Info, Bio, KnownFor } from 'src/components/name';
import Name from 'src/interfaces/shared/name';
import { AppError } from 'src/interfaces/shared/error';
import name from 'src/utils/fetchers/name';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { getProxiedIMDbImgUrl } from 'src/utils/helpers';
import { nameKey } from 'src/utils/constants/keys';
import styles from 'src/styles/modules/pages/name/name.module.scss';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NameInfo = ({ data, error }: Props) => {
  if (error) return <ErrorInfo message={error.message} statusCode={error.statusCode} />;

  return (
    <>
      <Meta
        title={data.basic.name}
        description={data.basic.bio.short + '...'}
        imgUrl={data.basic.poster?.url && getProxiedIMDbImgUrl(data.basic.poster.url)}
      />
      <Layout className={styles.name}>
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

type Data = { data: Name; error: null } | { error: AppError; data: null };
type Params = { nameId: string };

export const getServerSideProps: GetServerSideProps<Data, Params> = async ctx => {
  const nameId = ctx.params!.nameId;

  try {
    const data = await getOrSetApiCache(nameKey(nameId), name, nameId);

    return { props: { data, error: null } };
  } catch (error: any) {
    const { message, statusCode } = error;

    ctx.res.statusCode = statusCode;
    ctx.res.statusMessage = message;

    return { props: { error: { message, statusCode }, data: null } };
  }
};

export default NameInfo;
