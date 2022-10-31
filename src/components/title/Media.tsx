import Image from 'next/future/image'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { Media } from '../../interfaces/shared/title'
import { getProxiedIMDbImgUrl, modifyIMDbImg } from '../../utils/helpers'

import styles from '../../styles/modules/components/title/media.module.scss'

type Props = {
  className: string
  media: Media
  router: NextRouter
}

const Media = ({ className, media, router }: Props) => {
  return (
    <div className={`${className} ${styles.media}`}>
      {(media.trailer || !!media.videos.total) && (
        <section className={styles.videos}>
          <h2 className="heading heading__secondary">Videos</h2>

          <div className={styles.videos__container}>
            {media.trailer && (
              <div key={router.asPath} className={styles.trailer}>
                <video
                  aria-label="trailer video"
                  // it's a relatively new tag. hence jsx-all1 complains
                  aria-description={media.trailer.caption}
                  controls
                  playsInline
                  poster={getProxiedIMDbImgUrl(
                    modifyIMDbImg(media.trailer.thumbnail)
                  )}
                  className={styles.trailer__video}
                >
                  {media.trailer.urls.map((source) => (
                    <source
                      key={source.url}
                      type={source.mimeType}
                      src={getProxiedIMDbImgUrl(source.url)}
                      data-res={source.resolution}
                    />
                  ))}
                </video>
              </div>
            )}

            {!!media.videos.total &&
              media.videos.videos.map((video) => (
                <Link href={`/video/${video.id}`} key={video.id}>
                  <a className={styles.video}>
                    <Image
                      className={styles.video__img}
                      src={modifyIMDbImg(video.thumbnail)}
                      alt=""
                      fill
                      sizes="400px"
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
          <h2 className="heading heading__secondary">Images</h2>
          <div className={styles.images__container}>
            {media.images.images.map((image) => (
              <figure key={image.id} className={styles.image}>
                <Image
                  className={styles.image__img}
                  src={modifyIMDbImg(image.url)}
                  alt=""
                  fill
                  sizes="400px"
                />
                <figcaption className={styles.image__caption}>
                  {image.caption.plainText}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
export default Media
