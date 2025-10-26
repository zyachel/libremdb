import Image from 'next/future/image';
import { modifyIMDbImg } from 'src/utils/helpers';
import { Card } from 'src/components/card';
import type { Data } from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/names.module.scss';
import OptionalLink from './OptionalLink';

type Props = {
  names: Data<'PEOPLE'>[];
};

const Names = ({ names }: Props) => {
  return (
    <ul className={styles.names}>
      {names.map(name => (
        <Name {...name} key={name.name} />
      ))}
    </ul>
  );
};
export default Names;

const Name = ({ about, image, jobs, knownFor, name, url }: Props['names'][number]) => {
  // const style: CSSProperties = {
  //   backgroundImage: image ? `url(${getProxiedIMDbImgUrl(modifyIMDbImg(image, 300))})` : undefined,
  // };

  return (
    <Card hoverable className={styles.name}>
      <div className={styles.imgContainer}>
        {image ? (
          <Image src={modifyIMDbImg(image, 400)} alt='' fill className={styles.img} sizes='200px' />
        ) : (
          <svg className={styles.imgNA}>
            <use href='/svg/sprite.svg#icon-image-slash' />
          </svg>
        )}
      </div>
      <div className={styles.info}>
        <h2 className={`heading ${styles.heading}`}>
          <OptionalLink href={url} className={`heading ${styles.heading}`}>
            {name}
          </OptionalLink>
        </h2>
        <ul className={styles.basicInfo} aria-label='quick facts'>
          {jobs && <li>{jobs.join(', ')}</li>}
          {knownFor.map(movie => (
            <li key={movie.url}>
              <OptionalLink href={movie.url}>{movie.title}</OptionalLink>
            </li>
          ))}
        </ul>
        <p dangerouslySetInnerHTML={{ __html: about }} className={styles.about}></p>
      </div>
    </Card>
  );
};
