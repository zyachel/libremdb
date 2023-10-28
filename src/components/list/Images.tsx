import Image from 'next/future/image';
import { modifyIMDbImg } from 'src/utils/helpers';
import type { Data } from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/images.module.scss';

type Props = {
  images: Data<'images'>[];
};

const Images = ({ images }: Props) => {
  return (
    <section className={styles.container}>
      {images.map(image => (
        <figure className={styles.imgContainer} key={image}>
          <Image src={modifyIMDbImg(image, 400)} alt='' fill className={styles.img} sizes='200px'/>
        </figure>
      ))}
    </section>
  );
};

export default Images;
