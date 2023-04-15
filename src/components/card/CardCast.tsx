import Card from './Card';
import styles from 'src/styles/modules/components/card/card-cast.module.scss';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import { modifyIMDbImg } from 'src/utils/helpers';

type Props = {
  link: string;
  name: string;
  characters: string[] | null;
  attributes: string[] | null;
  image?: string | null;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'li'>;

const CardCast = ({ link, name, image, children, characters, attributes, ...rest }: Props) => {
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
            <p className={styles.role}>
              {characters?.join(', ')}
              {attributes && <span> ({attributes.join(', ')})</span>}
            </p>
            {children}
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default CardCast;
