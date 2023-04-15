import { Fragment } from 'react';
import Link from 'next/link';
import { CardBasic } from 'src/components/card';
import { Basic } from 'src/interfaces/shared/title';
import { formatNumber, formatTime } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/title/basic.module.scss';

type Props = {
  className: string;
  data: Basic;
};

const Basic = ({ data, className }: Props) => {
  const titleType = data.type.id;
  const releaseTime =
    titleType === 'tvSeries'
      ? `${data.releaseYear?.start}-${data.releaseYear?.end || 'present'}`
      : data.releaseYear?.start;

  return (
    <CardBasic
      className={`${styles.container} ${className}`}
      image={data.poster?.url}
      title={data.title}
    >
      <ul className={styles.meta} aria-label='quick facts'>
        {data.status && data.status.id !== 'released' && (
          <li className={styles.meta__text}>{data.status.text}</li>
        )}
        <li className={styles.meta__text}>{data.type.name}</li>
        {data.releaseYear && <li className={styles.meta__text}>{releaseTime}</li>}
        {data.ceritficate && <li className={styles.meta__text}>{data.ceritficate}</li>}
        {data.runtime && <li className={styles.meta__text}>{formatTime(data.runtime)}</li>}
      </ul>
      <div className={styles.ratings}>
        {data.ratings.avg && (
          <>
            <p className={styles.rating}>
              <span className={styles.rating__num}>{data.ratings.avg}</span>
              <svg className={styles.rating__icon}>
                <use href='/svg/sprite.svg#icon-rating'></use>
              </svg>
              <span className={styles.rating__text}> Avg. rating</span>
            </p>
            <p className={styles.rating}>
              <span className={styles.rating__num}>{formatNumber(data.ratings.numVotes)}</span>
              <svg className={styles.rating__icon}>
                <use href='/svg/sprite.svg#icon-like-dislike'></use>
              </svg>
              <span className={styles.rating__text}> No. of votes</span>
            </p>
          </>
        )}
        {data.ranking && (
          <p className={styles.rating}>
            <span className={styles.rating__num}>{formatNumber(data.ranking.position)}</span>
            <svg className={styles.rating__icon}>
              <use href='/svg/sprite.svg#icon-graph-rising'></use>
            </svg>
            <span className={styles.rating__text}>
              {' '}
              Popularity (
              <span className={styles.rating__sub}>
                {data.ranking.direction === 'UP'
                  ? `\u2191${formatNumber(data.ranking.change)}`
                  : data.ranking.direction === 'DOWN'
                  ? `\u2193${formatNumber(data.ranking.change)}`
                  : ''}
              </span>
              )
            </span>
          </p>
        )}
      </div>

      {!!data.genres.length && (
        <p className={styles.genres}>
          <span className={styles.genres__heading}>Genres: </span>
          {data.genres.map((genre, i) => (
            <Fragment key={genre.id}>
              {i > 0 && ', '}
              <Link href={`/search/title?genres=${genre.id}`}>
                <a className={styles.link}>{genre.text}</a>
              </Link>
            </Fragment>
          ))}
        </p>
      )}
      <p className={styles.overview}>
        <span className={styles.overview__heading}>Plot: </span>
        <span className={styles.overview__text}>{data.plot || '-'}</span>
      </p>
      {data.primaryCrew.map(crewType => (
        <p className={styles.crewType} key={crewType.type.id}>
          <span className={styles.crewType__heading}>{`${crewType.type.category}: `}</span>
          {crewType.crew.map((crew, i) => (
            <Fragment key={crew.id}>
              {i > 0 && ', '}
              <Link href={`/name/${crew.id}`}>
                <a className={styles.link}>{crew.name}</a>
              </Link>
            </Fragment>
          ))}
        </p>
      ))}
    </CardBasic>
  );
};

export default Basic;
