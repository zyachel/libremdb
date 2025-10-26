import Image from 'next/future/image';
import { modifyIMDbImg } from 'src/utils/helpers';
import type { DataImage } from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/images.module.scss';

type Props = {
  images: DataImage[];
};

const Images = ({ images }: Props) => {
  return (
    <section className={styles.container}>
      {images.map(
        image =>
          Boolean(image.image) && (
            <figure className={styles.imgContainer} key={image.imageId}>
              <Image
                src={modifyIMDbImg(image.image!, 400)}
                alt={image.caption ?? undefined}
                fill
                className={styles.img}
                sizes='200px'
              />
            </figure>
          )
      )}
    </section>
  );
};

export default Images;
