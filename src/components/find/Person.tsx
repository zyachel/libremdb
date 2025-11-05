import { CardResult } from 'src/components/card';
import { People } from 'src/interfaces/shared/search';
import styles from 'src/styles/modules/components/find/person.module.scss';

type Props = { person: People[number] };

const Person = ({ person }: Props) => {
  return (
    <CardResult showImage name={person.name} link={`/name/${person.id}`} image={person.image?.url}>
      <p>{person.professions.join(", ")}</p>
      <ul className={styles.basicInfo} aria-label='quick facts'>
        {person.knownForTitle && <li>{person.knownForTitle}</li>}
        {person.knownInYear && <li>{person.knownInYear}</li>}
      </ul>
      {person.bio && (
        <p className={styles.bio} dangerouslySetInnerHTML={{__html: person.bio}}></p>
      )}
    </CardResult>
  );
};

export default Person;
