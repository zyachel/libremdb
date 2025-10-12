import { CardCast } from 'src/components/card';
import { Cast } from 'src/interfaces/shared/title';
import styles from 'src/styles/modules/components/title/cast.module.scss';

type Props = {
  className: string;
  cast: Cast;
};

const Cast = ({ className, cast }: Props) => {
  if (!cast.length) return null;

  return (
    <section className={`${className} ${styles.container}`}>
      <h2 className='heading heading__secondary'>Cast</h2>
      <ul className={styles.cast}>
        {cast.map(member => (
          <CardCast
            key={member.id}
            link={`/name/${member.id}`}
            name={member.name}
            image={member.image}
            roles={member.roles}
          />
        ))}
      </ul>
    </section>
  );
};

export default Cast;
