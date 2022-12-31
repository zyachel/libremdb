import { Titles } from '../../interfaces/shared/search';
import Image from 'next/future/image';
import Link from 'next/link';
import { modifyIMDbImg } from '../../utils/helpers';

import styles from '../../styles/modules/components/find/title.module.scss';

type Props = {
  title: Titles[0];
};

const Title = ({ title }: Props) => {
  return (
    <li className={styles.title}>
      <div className={styles.imgContainer}>
        {title.image ? (
          <Image
            src={modifyIMDbImg(title.image.url, 400)}
            alt={title.image.caption}
            fill
            className={styles.img}
          />
        ) : (
          <svg className={styles.imgNA}>
            <use href="/svg/sprite.svg#icon-image-slash" />
          </svg>
        )}
      </div>
      <div className={styles.info}>
        <Link href={`/title/${title.id}`}>
          <a className={`heading ${styles.heading}`}>{title.name}</a>
        </Link>
        <ul aria-label="quick facts" className={styles.basicInfo}>
          {title.type && <li>{title.type}</li>}
          {title.sAndE && <li>{title.sAndE}</li>}
          {title.releaseYear && <li>{title.releaseYear}</li>}
        </ul>
        {!!title.credits.length && (
          <p className={styles.stars}>
            <span>Stars: </span>
            {title.credits.join(', ')}
          </p>
        )}
        {title.seriesId && (
          <ul aria-label="quick series facts" className={styles.seriesInfo}>
            {title.seriesType && <li>{title.seriesType}</li>}
            <li>
              <Link href={`/title/${title.seriesId}`}>
                <a className="link">{title.seriesName}</a>
              </Link>
            </li>
            {title.seriesReleaseYear && <li>{title.seriesReleaseYear}</li>}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Title;
