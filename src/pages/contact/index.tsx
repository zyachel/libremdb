import Meta from '../../components/Meta/Meta';
import Layout from '../../layouts/Layout';

import styles from '../../styles/modules/pages/contact/contact.module.scss';

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
            <p className={styles.item}>
              You can use{' '}
              <a href='https://github.com/zyachel/libremdb' className='link'>
                GitHub
              </a>{' '}
              or{' '}
              <a href='https://codeberg.org/zyachel/libremdb' className='link'>
                Codeberg
              </a>{' '}
              for general issues, questions, or requests.
            </p>
            <p className={styles.item}>
              In case you wish to contact me personally, I'm reachable via{' '}
              <a className='link' href='https://matrix.to/#/@ninal:matrix.org'>
                [matrix]
              </a>{' '}
              and{' '}
              <a className='link' href='mailto:aricla@protonmail.com'>
                email
              </a>
              .
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
