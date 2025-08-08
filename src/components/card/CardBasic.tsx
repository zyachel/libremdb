import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import Image from 'next/future/image';
import Card from './Card';
import { getProxiedIMDbImgUrl, modifyIMDbImg } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/card/card-basic.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  image?: string;
  title: string;
  originalTitle?: string;
} & ComponentPropsWithoutRef<'section'>;

const CardBasic = ({ image, children, className, title, originalTitle, ...rest }: Props) => {
  const style: CSSProperties = {
    backgroundImage: image && `url(${getProxiedIMDbImgUrl(modifyIMDbImg(image, 300))})`,
  };

  return (
    <Card as='section' className={`${styles.container} ${className}`} {...rest}>
      <div className={styles.imageContainer} style={style}>
        {image ? (
          <Image
            className={styles.image}
            src={modifyIMDbImg(image)}
            alt=''
            priority
            fill
            sizes='300px'
          />
        ) : (
          <svg className={styles.imageNA}>
            <use href='/svg/sprite.svg#icon-image-slash' />
          </svg>
        )}
      </div>
      <div className={styles.info}>
        <h1 className={`${styles.title} heading heading__primary`}>{title}</h1>
        {originalTitle && <span className={styles.originalTitle}>{originalTitle}</span>}
        {children}
      </div>
    </Card>
  );
};

export default CardBasic;
