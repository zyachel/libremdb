import Image from 'next/future/image';
import Link from 'next/link';
import { Cast } from '../../interfaces/shared/title';
import { modifyIMDbImg } from '../../utils/helpers';

import styles from '../../styles/modules/components/title/cast.module.scss';

type Props = {
  className: string;
  cast: Cast;
};

const Cast = ({ className, cast }: Props) => {
  if (!cast.length) return <></>;

  return (
    <section className={`${className} ${styles.container}`}>
      <h2 className='heading heading__secondary'>Cast</h2>
      <ul className={styles.cast}>
        {cast.map(member => (
          <li key={member.id} className={styles.member}>
            <div className={styles.member__imgContainer}>
              {member.image ? (
                <Image
                  src={modifyIMDbImg(member.image, 400)}
                  alt=''
                  fill
                  className={styles.member__img}
                  sizes='200px'
                />
              ) : (
                <svg className={styles.member__imgNA}>
                  <use href='/svg/sprite.svg#icon-image-slash' />
                </svg>
              )}
            </div>
            <div className={styles.member__textContainer}>
              <p>
                <Link href={`/name/${member.id}`}>
                  <a className={styles.member__name}>{member.name}</a>
                </Link>
              </p>
              <p className={styles.member__role}>
                {member.characters?.join(', ')}
                {member.attributes && (
                  <span> ({member.attributes.join(', ')})</span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Cast;
