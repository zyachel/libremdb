import Image from 'next/future/image';
import Link from 'next/link';
import { Media } from 'src/interfaces/shared';
import { getProxiedIMDbImgUrl, modifyIMDbImg } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/media/media.module.scss';

type Props = {
  className: string;
  media: Media;
};

// TODO: refactor this component.

const Media = ({ className, media }: Props) => {
  return (
    <div className={`${className} ${styles.media}`}>
      {(media.trailer || !!media.videos.total) && (
        <section className={styles.videos}>
          <h2 className='heading heading__secondary'>Videos</h2>

          <div className={styles.videos__container}>
            {media.trailer && (
              <div className={styles.trailer}>
                <video
                  aria-label='trailer video'
                  controls
                  playsInline
                  poster={getProxiedIMDbImgUrl(modifyIMDbImg(media.trailer.thumbnail))}
                  className={styles.trailer__video}
                  preload='none'
                >
                  {media.trailer.urls.map(source => (
                    <source
                      key={source.url}
                      type={source.mimeType ?? undefined}
                      src={getProxiedIMDbImgUrl(source.url)}
                      data-res={source.resolution}
                    />
                  ))}
                </video>
              </div>
            )}

            {!!media.videos.total &&
              media.videos.videos.map(video => (
                <Link href={`/video/${video.id}`} key={video.id}>
                  <a className={styles.video}>
                    <Image
                      className={styles.video__img}
                      src={modifyIMDbImg(video.thumbnail)}
                      alt=''
                      fill
                      sizes='400px'
                    />
                    <p className={styles.video__caption}>
                      {video.caption} ({video.runtime}s)
                    </p>
                  </a>
                </Link>
              ))}
          </div>
        </section>
      )}
      {!!media.images.total && (
        <section className={styles.images}>
          <h2 className='heading heading__secondary'>Images</h2>
          <div className={styles.images__container}>
            {media.images.images.map(image => (
              <figure key={image.id} className={styles.image}>
                <Image
                  className={styles.image__img}
                  src={modifyIMDbImg(image.url)}
                  alt=''
                  fill
                  sizes='400px'
                />
                <figcaption className={styles.image__caption}>{image.caption.plainText}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default Media;
