import { CardBasic } from 'src/components/card';
import { Basic as BasicType } from 'src/interfaces/shared/name';
import { formatNumber } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/name/basic.module.scss';
import { Fragment } from 'react';

type Props = {
  className: string;
  data: BasicType;
};

const Basic = ({ data, className }: Props) => {
  return (
    <CardBasic className={className} image={data.poster?.url} title={data.name}>
      <div className={styles.ratings}>
        {data.ranking && (
          <p className={styles.rating}>
            <span className={styles.rating__num}>{formatNumber(data.ranking.position)}</span>
            <svg className={styles.rating__icon}>
              <use href='/svg/sprite.svg#icon-graph-rising'></use>
            </svg>
            <span className={styles.rating__text}>
              {' '}
              Popularity (
              <span className={styles.rating__sub}>{getRankingStats(data.ranking)}</span>)
            </span>
          </p>
        )}
      </div>

      {!!data.primaryProfessions.length && (
        <p className={styles.genres}>
          <span className={styles.heading}>Profession: </span>
          {data.primaryProfessions.join(', ')}
        </p>
      )}
      {
        <p className={styles.overview}>
          <span className={styles.heading}>About: </span>
          {data.bio.short}...
        </p>
      }
      {data.knownFor.length && (
        <p className={styles.genres}>
          <span className={styles.heading}>Known for: </span>
          {data.knownFor.map((k, i) => (
            <span key={k.title}>
              {k.title} ({k.roles.join(', ')}){i < data.knownFor.length - 1 && ', '}
            </span>
          ))}
        </p>
      )}
    </CardBasic>
  );
};

const getRankingStats = (ranking: NonNullable<Props['data']['ranking']>) => {
  if (ranking.direction === 'FLAT') return '\u2192';

  const change = formatNumber(ranking.change);
  return (ranking.direction === 'UP' ? '\u2191' : '\u2193') + change;
};

export default Basic;
