import Card from './Card';
import styles from 'src/styles/modules/components/card/card-cast.module.scss';
import { Fragment, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import { modifyIMDbImg } from 'src/utils/helpers';
import type { Cast } from 'src/interfaces/shared/title';

type Props = {
  link: string;
  name: string;
  roles: Cast[number]['roles'];
  image?: string | null;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'li'>;

const CardCast = ({ link, name, image, children, roles, ...rest }: Props) => {
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
              {roles.map((role, i) => (
                <Fragment key={i}>
                  {role.characters?.join(', ')}
                  {role.attributes && <span> ({role.attributes.join(', ')})</span>}
                </Fragment>
              ))}
            </p>
            {children}
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default CardCast;
