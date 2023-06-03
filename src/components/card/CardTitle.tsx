import Card from './Card';
import styles from 'src/styles/modules/components/card/card-title.module.scss';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import { formatNumber, modifyIMDbImg } from 'src/utils/helpers';

type Props = {
  link: string;
  name: string;
  titleType: string;
  year?: { start: number; end: number | null };
  ratings?: { avg: number | null; numVotes: number };
  image?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'li'>;

const CardTitle = ({ link, name, year, image, ratings, titleType, children, ...rest }: Props) => {
  const years = year?.end ? `${year.start}-${year.end}` : year?.start;

  return (
    <Card hoverable {...rest}>
      <Link href={link}>
        <a className={styles.item}>
          <div className={styles.imgContainer}>
            {image ? (
              <Image
                src={modifyIMDbImg(image, 400)}
                alt=''
                fill
                className={styles.img}
                sizes='200px'
              />
            ) : (
              <svg className={styles.imgNA}>
                <use href='/svg/sprite.svg#icon-image-slash' />
              </svg>
            )}
          </div>
          <div className={styles.textContainer}>
            <p className={`heading ${styles.name}`}>{name}</p>
            <p>
              <span>{titleType}</span>
              <span>{years && ` (${years})`}</span>
            </p>
            {ratings?.avg && (
              <p className={styles.rating}>
                <span className={styles.ratingNum}>{ratings.avg}</span>
                <svg className={styles.ratingIcon}>
                  <use href='/svg/sprite.svg#icon-rating'></use>
                </svg>
                <span> ({formatNumber(ratings.numVotes)} votes)</span>
              </p>
            )}
            <div className={styles.children}>{children}</div>
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default CardTitle;
