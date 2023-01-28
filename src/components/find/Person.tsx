import Image from 'next/future/image';
import Link from 'next/link';
import { People } from 'src/interfaces/shared/search';
import { modifyIMDbImg } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/find/person.module.scss';

type Props = {
  person: People[0];
};

const Person = ({ person }: Props) => {
  return (
    <li className={styles.person}>
      <div className={styles.imgContainer} style={{ position: 'relative' }}>
        {person.image ? (
          <Image
            src={modifyIMDbImg(person.image.url, 400)}
            alt={person.image.caption}
            fill
            className={styles.img}
          />
        ) : (
          <svg className={styles.imgNA}>
            <use href='/svg/sprite.svg#icon-image-slash' />
          </svg>
        )}
      </div>
      <div className={styles.info}>
        <Link href={`name/${person.id}`}>
          <a className={`heading ${styles.heading}`}>{person.name}</a>
        </Link>
        {person.aka && <p>{person.aka}</p>}
        {person.jobCateogry && <p>{person.jobCateogry}</p>}
        {(person.knownForTitle || person.knownInYear) && (
          <ul className={styles.basicInfo} aria-label='quick facts'>
            {person.knownForTitle && <li>{person.knownForTitle}</li>}
            {person.knownInYear && <li>{person.knownInYear}</li>}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Person;
