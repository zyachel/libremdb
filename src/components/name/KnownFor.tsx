import type { KnownFor as KnownForType } from 'src/interfaces/shared/name';
import { CardTitle } from 'src/components/card';
import styles from 'src/styles/modules/components/name/known-for.module.scss';

type Props = { data: KnownForType };

const KnownFor = ({ data }: Props) => {
  if (!data.length) return null;

  return (
    <section className={styles.knownFor}>
      <h2 className='heading heading__secondary'>Known For</h2>
      <ul className={styles.container}>
        {data.map(title => (
          <CardTitle
            key={title.id}
            link={`/title/${title.id}`}
            name={title.title}
            titleType={title.type.text}
            image={title.poster?.url}
            year={title.releaseYear}
          >
            <p className={styles.item__role}>{getRoles(title)}</p>
          </CardTitle>
        ))}
      </ul>
    </section>
  );
};

const getRoles = (title: Props['data'][number]) =>
  (title.summary.characters ?? title.summary.jobs)?.join(', ');

export default KnownFor;
