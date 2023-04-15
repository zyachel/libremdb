import { Credits } from 'src/interfaces/shared/name';
import { CardTitle } from 'src/components/card';
import styles from 'src/styles/modules/components/name/credits.module.scss';

type Props = {
  className: string;
  data: Credits;
};

const Credits = ({ className, data }: Props) => {
  if (!data.total) return null;

  return (
    <section className={`${className} ${styles.credits}`}>
      <h2 className='heading heading__secondary'>Credits</h2>
      <section>
        <h3 className='heading heading__tertiary'>Released</h3>
        {data.released.map(
          (item, i) =>
            !!item.total && (
              <details open={i === 0} key={item.category.id}>
                <summary>
                  {item.category.text} ({item.total})
                </summary>
                <ul className={styles.container} key={item.category.id}>
                  {item.titles.map(title => (
                    <CardTitle
                      key={title.id}
                      link={`/title/${title.id}`}
                      name={title.title}
                      titleType={title.type.text}
                      image={title.poster?.url}
                      year={title.releaseYear}
                      ratings={title.ratings}
                    />
                  ))}
                </ul>
              </details>
            )
        )}
      </section>
      <section>
        <h3 className='heading heading__tertiary'>Unreleased</h3>
        {data.unreleased.map(
          (item, i) =>
            !!item.total && (
              <details open={i === 0} key={item.category.id}>
                <summary>
                  {item.category.text} ({item.total})
                </summary>
                <ul className={styles.container}>
                  {item.titles.map(title => (
                    <CardTitle
                      key={title.id}
                      link={`/title/${title.id}`}
                      name={title.title}
                      titleType={title.type.text}
                      image={title.poster?.url}
                      year={title.releaseYear}
                    >
                      <p>{title.productionStatus}</p>
                    </CardTitle>
                  ))}
                </ul>
              </details>
            )
        )}
      </section>
    </section>
  );
};

export default Credits;
