import Meta from 'src/components/meta/Meta';
import Layout from 'src/components/layout';
import styles from 'src/styles/modules/pages/contact/contact.module.scss';

const Contact = () => {
  return (
    <>
      <Meta
        title='Contact'
        description='Contact page of libremdb, a free & open source IMDb front-end.'
      />
      <Layout className=''>
        <section className={styles.contact}>
          <h1 className={`heading heading__primary ${styles.contact__heading}`}>
            Contact
          </h1>
          <div className={styles.list}>
            <div className={styles.item}>
              <p className={styles.item__text}>
                For any issues, questions, bugs, or requests regarding the
                service, you can go to{' '}
                <a href='https://github.com/zyachel/libremdb' className='link'>
                  GitHub
                </a>
                .
              </p>
              <p className={styles.item__text}>
                Alternatively, you can visit{' '}
                <a
                  href='https://codeberg.org/zyachel/libremdb'
                  className='link'
                >
                  the repository on Codeberg
                </a>
                .
              </p>
            </div>
            {process.env.NEXT_PUBLIC_INSTANCE_MAIN_URL && (
              <div className={styles.item}>
                <p className={styles.item__text}>
                  If you have some questions related to this instance,{' '}
                  <a
                    href={process.env.NEXT_PUBLIC_INSTANCE_MAIN_URL}
                    className='link'
                  >
                    contact instance maintainer(s)
                  </a>
                  .
                </p>
              </div>
            )}
            <div className={styles.item}>
              <p className={styles.item__text}>
                In case you wish to contact me(the dev) personally,{' '}
                <a href='https://iket.me/contact/' className='link'>
                  here you go
                </a>
                <span aria-label='smily text emoji'> :)</span>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
