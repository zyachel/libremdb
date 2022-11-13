/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Meta from '../../components/Meta/Meta'
import Layout from '../../layouts/Layout'

import styles from '../../styles/modules/pages/about/about.module.scss'

const About = () => {
  return (
    <>
      <Meta
        title="About"
        description="libremdb is a free & open source IMDb front-end. It allows you to see information about movies, tv shows, video games without any ads or tracking."
      />
      <Layout full className={styles.about}>
        <section id="features" className={styles.features}>
          <h2
            className={`heading heading__secondary ${styles.features__heading}`}
          >
            Some features
          </h2>
          <ul className={styles.features__list}>
            <li className={styles.feature}>
              <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                className={styles.feature__icon}
              >
                <use href="/svg/sprite.svg#icon-eye-slash"></use>
              </svg>
              <h3
                className={`heading heading__tertiary ${styles.feature__heading}`}
              >
                No ads or tracking
              </h3>
              <p className={styles.feature__text}>
                Browse any movie info without being tracked or bombarded by
                annoying ads.
              </p>
            </li>
            <li className={styles.feature}>
              <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                className={styles.feature__icon}
              >
                <use href="/svg/sprite.svg#icon-palette"></use>
              </svg>
              <h3
                className={`heading heading__tertiary ${styles.feature__heading}`}
              >
                Modern interface
              </h3>
              <p className={styles.feature__text}>
                Modern interface with curated colors supporting both dark and
                light themes.
              </p>
            </li>
            <li className={styles.feature}>
              <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                className={styles.feature__icon}
              >
                <use href="/svg/sprite.svg#icon-responsive"></use>
              </svg>
              <h3
                className={`heading heading__tertiary ${styles.feature__heading}`}
              >
                Responsive design
              </h3>
              <p className={styles.feature__text}>
                Be it your small mobile or big computer screen, it's fully
                responsive.
              </p>
            </li>
          </ul>
        </section>
        <section id="faq" className={styles.faqs}>
          <h2 className={`heading heading__secondary ${styles.faqs__heading}`}>
            Questions you may have
          </h2>
          <div className={styles.faqs__list}>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                How do I use this?
              </summary>
              <p className={styles.faq__description}>
                Replace `imdb.com` in any IMDb URL with any of the instances.
                For example: `
                <a href="https://imdb.com/title/tt1049413" className="link">
                  imdb.com/title/tt1049413
                </a>
                ` to `
                <a
                  href="https://libremdb.iket.me/title/tt1049413"
                  className="link"
                >
                  libremdb.iket.me/title/tt1049413
                </a>
                ` . To avoid changing the URLs manually, you can use extensions
                like{' '}
                <a
                  href="https://github.com/libredirect/libredirect/"
                  className="link"
                >
                  LibRedirect
                </a>
                .
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>Why is it slow?</summary>
              <p className={styles.faq__description}>
                Whenever you request info about a movie/show on libremdb, 4
                trips are made(2 between your browser and libremdb's server, and
                2 between libremdb's server and IMDb's server) instead of the
                usual 2 trips when you visit a website. For this reason there's
                a noticable delay. This is a bit of inconvenience you'll have to
                face should you wish to use this website.
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                It doesn't have all routes.
              </summary>
              <p className={styles.faq__description}>
                I'll implement more with time :)
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                Is content served from third-parties, like Amazon?
              </summary>
              <p className={styles.faq__description}>
                Nope, libremdb proxies all image and video requests through the
                instance to avoid exposing your IP address, browser information
                and other personally identifiable metadata (
                <a
                  href="https://github.com/httpjamesm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Contributor
                </a>
                ).
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                Will Amazon track me then?
              </summary>
              <p className={styles.faq__description}>
                Also nope. All Amazon will see is the libremdb instance making
                the request, not you. IP address, browser information and other
                personally identifiable metadata is hidden from Amazon.
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                Why not just use IMDb?
              </summary>
              <p className={styles.faq__description}>
                Refer to the{' '}
                <a className="link" href="#features">
                  features section
                </a>{' '}
                above.
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                Why didn't you use other databases like TMDB or OMDb?
              </summary>
              <p className={styles.faq__description}>
                IMDb simply has superior dataset compared to all other
                alternatives. With that being said, I'd encourage you to check
                out those alternatives too.
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                Your website name is quite, ehm, lame.
              </summary>
              <p className={styles.faq__description}>
                Let's just say I'm not very good at naming things.
              </p>
            </details>
            <details className={styles.faq}>
              <summary className={styles.faq__summary}>
                I have some ideas/features/suggestions.
              </summary>
              <p className={styles.faq__description}>
                That's great! I've a couple of{' '}
                <Link href="/contact">
                  <a className="link">contact methods</a>
                </Link>
                . Send your beautiful suggestions(or complaints), or just drop a
                hi.
              </p>
            </details>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default About
