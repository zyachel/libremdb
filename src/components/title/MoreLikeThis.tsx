import { CardTitle } from 'src/components/card';
import { MoreLikeThis } from 'src/interfaces/shared/title';
import styles from 'src/styles/modules/components/title/more-like-this.module.scss';

type Props = {
  className: string;
  data: MoreLikeThis;
};

const MoreLikeThis = ({ className, data }: Props) => {
  if (!data.length) return null;

  return (
    <section className={`${className} ${styles.morelikethis}`}>
      <h2 className='heading heading__secondary'>More like this</h2>
      <ul className={styles.container}>
        {data.map(title => (
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
    </section>
  );
};
export default MoreLikeThis;
