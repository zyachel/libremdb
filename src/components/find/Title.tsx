import Link from 'next/link';
import { CardResult } from 'src/components/card';
import { Titles } from 'src/interfaces/shared/search';
import styles from 'src/styles/modules/components/find/title.module.scss';

type Props = { title: Titles[number] };

const Title = ({ title }: Props) => {
  return (
    <CardResult showImage name={title.name} link={`/title/${title.id}`} image={title.image?.url}>
      <ul aria-label='quick facts' className={styles.basicInfo}>
        <li>{title.type}</li>
        <li>{title.sAndE}</li>
        <li>{title.releaseYear}</li>
      </ul>
      {!!title.credits.length && (
        <p className={styles.stars}>
          <span>Stars: </span>
          {title.credits.join(', ')}
        </p>
      )}
      {title.seriesId && (
        <ul aria-label='quick series facts' className={styles.seriesInfo}>
          {title.seriesType && <li>{title.seriesType}</li>}
          <li>
            <Link href={`/title/${title.seriesId}`}>
              <a className='link'>{title.seriesName}</a>
            </Link>
          </li>
          {title.seriesReleaseYear && <li>{title.seriesReleaseYear}</li>}
        </ul>
      )}
    </CardResult>
  );
};

export default Title;
