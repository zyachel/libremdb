import Meta from 'src/components/meta/Meta';
import Layout from 'src/layouts/Layout';
import packageInfo from 'src/../package.json';
import styles from 'src/styles/modules/pages/privacy/privacy.module.scss';

const Privacy = () => {
  return (
    <>
      <Meta
        title='Privacy'
        description='Privacy policy of libremdb, a free & open source IMDb front-end.'
      />
      <Layout className={styles.privacy}>
        <section className={styles.policy}>
          <h1 className={`heading heading__primary ${styles.policy__heading}`}>
            Privacy Policy
          </h1>
          <div className={styles.list}>
            <section className={styles.item}>
              <h2
                className={`heading heading__secondary ${styles.item__heading}`}
              >
                Information collected
              </h2>
              <p className={styles.item__text}>No information is collected.</p>
            </section>
            <section className={styles.item}>
              <h2
                className={`heading heading__secondary ${styles.item__heading}`}
              >
                Information stored in your browser
              </h2>
              <p className={styles.item__text}>
                A key named 'theme' is stored in Local Storage provided by your
                browser, if you ever override the default theme. To remove it,
                go to site data settings, and clear the data for this website.
              </p>
              <p className={styles.item__text}>
                To permamently disable libremdb from storing your theme
                prefrences, either turn off JavaScript or disable access to
                Local Storage for libremdb.
              </p>
            </section>
            <section className={styles.item}>
              <h2
                className={`heading heading__secondary ${styles.item__heading}`}
              >
                Instance information
              </h2>
              {process.env.NEXT_PUBLIC_INSTANCE_NAME &&
                process.env.NEXT_PUBLIC_INSTANCE_MAIN_URL && (
                  <p className={styles.item__text}>
                    Operated by:&nbsp;
                    <a
                      className='link'
                      href={process.env.NEXT_PUBLIC_INSTANCE_MAIN_URL}
                    >
                      {process.env.NEXT_PUBLIC_INSTANCE_NAME}
                    </a>
                  </p>
                )}
              <p className={styles.item__text}>
                Version:&nbsp;
                <a
                  className='link'
                  href={`https://github.com/zyachel/libremdb/tree/v${packageInfo.version}`}
                >
                  {packageInfo.version}
                </a>
              </p>
            </section>
          </div>

          <footer className={styles.metadata}>
            <p>
              Privacy policy last updated on <time>31 october, 2022.</time>
            </p>
            <p>
              You can see the full revision history of this privacy policy on
              GitHub, or Codeberg.
            </p>
          </footer>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;
