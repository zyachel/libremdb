import Company from './Company';
import Person from './Person';
import Title from './Title';
import Keyword from './Keyword';
import Find from 'src/interfaces/shared/search';
import { getResTitleTypeHeading } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/find/results.module.scss';

type Props = {
  results: Find | null;
  className?: string;
  title: string;
};

const resultsExist = (results: Props['results']) => {
  if (
    !results ||
    (!results.people.length &&
      !results.keywords.length &&
      !results.companies.length &&
      !results.titles.length)
  )
    return false;

  return true;
};

// MAIN COMPONENT
const Results = ({ results, className, title }: Props) => {
  if (!resultsExist(results))
    return (
      <h1 className={`heading heading__primary ${className}`}>
        No results found
      </h1>
    );

  const { titles, people, keywords, companies, meta } = results!;
  const titlesSectionHeading = getResTitleTypeHeading(
    meta.type,
    meta.titleType
  );

  return (
    <article className={`${className} ${styles.results}`}>
      <h1 className='heading heading__primary'>Results for '{title}'</h1>
      <div className={styles.results__list}>
        {!!titles.length && (
          <section className={styles.titles}>
            <h2 className='heading heading__secondary'>
              {titlesSectionHeading}
            </h2>
            <ul className={styles.titles__list}>
              {titles.map(title => (
                <Title title={title} key={title.id} />
              ))}
            </ul>
          </section>
        )}
        {!!people.length && (
          <section className={styles.people}>
            <h2 className='heading heading__secondary'>People</h2>
            <ul className={styles.people__list}>
              {people.map(person => (
                <Person person={person} key={person.id} />
              ))}
            </ul>
          </section>
        )}
        {!!companies.length && (
          <section className={styles.people}>
            <h2 className='heading heading__secondary'>Companies</h2>
            <ul className={styles.people__list}>
              {companies.map(company => (
                <Company company={company} key={company.id} />
              ))}
            </ul>
          </section>
        )}
        {!!keywords.length && (
          <section className={styles.people}>
            <h2 className='heading heading__secondary'>Keywords</h2>
            <ul className={styles.people__list}>
              {keywords.map(keyword => (
                <Keyword keyword={keyword} key={keyword.id} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
};

export default Results;
