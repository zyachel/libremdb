import Image from 'next/future/image';
import Link from 'next/link';
import { MoreLikeThis } from 'src/interfaces/shared/title';
import { formatNumber, modifyIMDbImg } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/title/more-like-this.module.scss';

type Props = {
  className: string;
  data: MoreLikeThis;
};

const MoreLikeThis = ({ className, data }: Props) => {
  if (!data.length) return <></>;

  return (
    <section className={`${className} ${styles.morelikethis}`}>
      <h2 className='heading heading__secondary'>More like this</h2>
      <ul className={styles.container}>
        {data.map(title => (
          <li key={title.id}>
            <Link href={`/title/${title.id}`}>
              <a className={styles.item}>
                <div className={styles.item__imgContainer}>
                  {title.poster ? (
                    <Image
                      src={modifyIMDbImg(title.poster.url, 400)}
                      alt=''
                      fill
                      className={styles.item__img}
                      sizes='200px'
                    />
                  ) : (
                    <svg className={styles.item__imgNA}>
                      <use href='/svg/sprite.svg#icon-image-slash' />
                    </svg>
                  )}
                </div>
                <div className={styles.item__textContainer}>
                  <h3 className={`heading ${styles.item__heading}`}>
                    {title.title}
                  </h3>
                  {title.ratings.avg && (
                    <p className={styles.item__rating}>
                      <span className={styles.item__ratingNum}>
                        {title.ratings.avg}
                      </span>
                      <svg className={styles.item__ratingIcon}>
                        <use href='/svg/sprite.svg#icon-rating'></use>
                      </svg>
                      <span>
                        ({formatNumber(title.ratings.numVotes)} votes)
                      </span>
                    </p>
                  )}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default MoreLikeThis;
