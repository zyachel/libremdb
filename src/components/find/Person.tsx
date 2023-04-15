import { CardResult } from 'src/components/card';
import { People } from 'src/interfaces/shared/search';
import styles from 'src/styles/modules/components/find/person.module.scss';

type Props = { person: People[number] };

const Person = ({ person }: Props) => {
  return (
    <CardResult showImage name={person.name} link={`/name/${person.id}`} image={person.image?.url}>
      <p>{person.aka}</p>
      <p>{person.jobCateogry}</p>
      <ul className={styles.basicInfo} aria-label='quick facts'>
        {person.knownForTitle && <li>{person.knownForTitle}</li>}
        {person.knownInYear && <li>{person.knownInYear}</li>}
      </ul>
    </CardResult>
  );
};

export default Person;
