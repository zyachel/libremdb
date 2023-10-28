import Image from 'next/future/image';
import { getProxiedIMDbImgUrl, modifyIMDbImg } from 'src/utils/helpers';
import { Card } from 'src/components/card';
import type { Data } from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/titles.module.scss';
import { CSSProperties } from 'react';
import OptionalLink from './OptionalLink';

type Props = {
  titles: Data<'titles'>[];
};

const Titles = ({ titles }: Props) => {
  return (
    <ul className={styles.titles}>
      {titles.map(title => (
        <Title {...title} key={title.name} />
      ))}
    </ul>
  );
};
export default Titles;

const Title = (props: Props['titles'][number]) => {
  const style: CSSProperties = {
    backgroundImage: props.image
      ? `url(${getProxiedIMDbImgUrl(modifyIMDbImg(props.image, 300))})`
      : undefined,
  };

  return (
    <Card hoverable className={styles.title}>
      <div className={styles.imgContainer}>
        {props.image ? (
          <Image src={modifyIMDbImg(props.image, 400)} alt='' fill className={styles.img} />
        ) : (
          <svg className={styles.imgNA}>
            <use href='/svg/sprite.svg#icon-image-slash' />
          </svg>
        )}
      </div>
      <div className={styles.info}>
        <h2 className={`heading heading__tertiary ${styles.heading}`}>
          <OptionalLink href={props.url} className={`heading ${styles.heading}`}>
            {props.name} {props.year}
          </OptionalLink>
        </h2>
        <ul className={styles.basicInfo} aria-label='quick facts'>
          {props.certificate && <li>{props.certificate}</li>}
          {props.runtime && <li>{props.runtime}</li>}
          {props.genre && <li>{props.genre}</li>}
        </ul>
        <ul className={styles.ratings}>
          {Boolean(props.rating) && <li className={styles.rating}>
            <span className={styles.rating__num}>{props.rating}</span>
            <svg className={styles.rating__icon}>
              <use href='/svg/sprite.svg#icon-rating'></use>
            </svg>
            <span className={styles.rating__text}> Avg. rating</span>
          </li>}
          {Boolean(props.metascore) && <li className={styles.rating}>
            <span className={styles.rating__num}>{props.metascore}</span>
            <span className={styles.rating__text}>Metascore</span>
          </li>}
        </ul>
        <p className={styles.plot}>
          <span>Plot:</span> {props.plot}
        </p>
        <ul className={styles.otherInfo}>
          {props.otherInfo.map(([infoHeading, info]) => (
            <li key={infoHeading}>
              <span>{infoHeading}:</span> {info}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
