import styles from 'src/styles/modules/components/name/did-you-know.module.scss';

type Props = { bio: string };

const Bio = ({ bio }: Props) => (
  <section className={styles.bio}>
    <h2 className='heading heading__secondary'>About</h2>
    <div dangerouslySetInnerHTML={{ __html: bio }} />
  </section>
);

export default Bio;
