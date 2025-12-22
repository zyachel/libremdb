import { formatNumber, formatTime } from 'src/utils/helpers';
import { CardResult } from 'src/components/card';
import { Titles } from 'src/interfaces/shared/search';
import styles from 'src/styles/modules/components/find/title.module.scss';

type Props = { title: Titles[number] };

const Title = ({ title }: Props) => {
  return (
    <CardResult showImage name={title.name} link={`/title/${title.id}`} image={title.image?.url}>
      <ul aria-label='quick facts' className={styles.basicInfo}>
        <li>{title.type}</li>
        {title.runtime && (
          <li>{formatTime(title.runtime)}</li>
        )}
        <li>{title.releaseYear}</li>
        {Boolean(title.rating.score) && (
          <li className={styles.rating}>
            <svg aria-label="Rating" className={styles.rating__icon}>
              <use className={styles.rating__use} href='/svg/sprite.svg#icon-rating'></use>
            </svg>
           {title.rating.score} ({formatNumber(title.rating.voteCount)})
          </li>
        )}
      </ul>
      {title.plot && (
        <p className={styles.plot} dangerouslySetInnerHTML={{__html: title.plot}}></p>
      )}
    </CardResult>
  );
};

export default Title;
