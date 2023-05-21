import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import Card from './Card';
import { modifyIMDbImg } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/card/card-result.module.scss';

type Props = {
  link: string;
  name: string;
  image?: string;
  showImage?: true;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'li'>;

const CardResult = ({ link, name, image, showImage, children, ...rest }: Props) => {
  let ImageComponent = null;
  if (showImage)
    ImageComponent = image ? (
      <Image src={modifyIMDbImg(image, 400)} alt='' fill className={styles.img} sizes='200px' />
    ) : (
      <svg className={styles.imgNA}>
        <use href='/svg/sprite.svg#icon-image-slash' />
      </svg>
    );

  return (
    <Card hoverable {...rest} className={`${styles.item} ${!showImage && styles.sansImage}`}>
      <div className={styles.imgContainer}>{ImageComponent}</div>
      <div className={styles.info}>
        <Link href={link}>
          <a className={`heading ${styles.heading}`}>{name}</a>
        </Link>
        {children}
      </div>
    </Card>
  );
};

export default CardResult;
