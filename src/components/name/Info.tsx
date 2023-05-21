import Link from 'next/link';
import { useRouter } from 'next/router';
import Name, { PersonalDetails } from 'src/interfaces/shared/name';
import styles from 'src/styles/modules/components/name/info.module.scss';

type Props = {
  info: PersonalDetails;
  accolades: Name['accolades'];
};

const PersonalDetails = ({ info, accolades }: Props) => {
  const {
    query: { nameId },
  } = useRouter();

  return (
    <div className={styles.info}>
      <section className={styles.accolades}>
        <h2 className='heading heading__secondary'>Accolades</h2>
        <div className={styles.accolades__container}>
          {accolades.awards && (
            <p>
              <span>
                Won {accolades.awards.wins} {accolades.awards.name}
              </span>
              <span> (out of {accolades.awards.nominations} nominations)</span>
            </p>
          )}
          <p>
            {accolades.wins} wins and {accolades.nominations} nominations in total
          </p>
          <p>
            <Link href={`/name/${nameId}/awards`}>
              <a className='link'>View all awards</a>
            </Link>
          </p>
        </div>
      </section>

      <section className={styles.details}>
        <h2 className='heading heading__secondary'>Personal details</h2>
        <div className={styles.details__container}>
          {!!info.officialSites.length && (
            <p>
              <span>Official sites: </span>
              {info.officialSites.map((site, i) => (
                <span key={site.url}>
                  {!!i && ', '}
                  <a href={site.url} className='link' target='_blank' rel='noreferrer'>
                    {site.name}
                  </a>
                </span>
              ))}
            </p>
          )}
          {!!info.alsoKnownAs.length && (
            <p>
              <span>Also known as: </span>
              <span>{info.alsoKnownAs.join(', ')}</span>
            </p>
          )}
          {info.height && (
            <p>
              <span>Height: </span>
              <span>{info.height}</span>
            </p>
          )}
          {info.birth && (
            <p>
              <span>Born: </span>
              <span>{info.birth.date}</span>
              <span>
                {' '}
                in{' '}
                <Link href={`/search/name?birth_place=${info.birth.location}`}>
                  <a className='link'>{info.birth.location}</a>
                </Link>
              </span>
            </p>
          )}
          {info.death.date && (
            <p>
              <span>Died: </span>
              <span>{info.death.date}</span>
              {info.death.location && (
                <span>
                  {' '}
                  in{' '}
                  <Link href={`/search/name?death_place=${info.death.location}`}>
                    <a className='link'>{info.death.location}</a>
                  </Link>
                </span>
              )}
            </p>
          )}
          {info.death.cause && (
            <p>
              <span>Death cause: </span>
              <span>{info.death.cause}</span>
            </p>
          )}
          {!!info.spouses?.length && (
            <p>
              <span>Spouses: </span>
              {info.spouses.map((spouse, i) => (
                <span key={spouse.name}>
                  {!!i && ', '}
                  {renderPersonNameWithLink(spouse)} {spouse.range}
                  {spouse.attributes && ' (' + spouse.attributes.join(', ') + ')'}
                </span>
              ))}
            </p>
          )}
          {!!info.children?.length && (
            <p>
              <span>Children: </span>
              {info.children.map((child, i) => (
                <span key={child.name}>
                  {!!i && ', '}
                  {renderPersonNameWithLink(child)}
                </span>
              ))}
            </p>
          )}
          {!!info.parents?.length && (
            <p>
              <span>Parents: </span>
              {info.parents.map((parent, i) => (
                <span key={parent.name}>
                  {!!i && ', '}
                  {renderPersonNameWithLink(parent)}
                </span>
              ))}
            </p>
          )}
          {!!info.relatives?.length && (
            <p>
              <span>Relatives: </span>
              {info.relatives.map((relative, i) => (
                <span key={relative.name}>
                  {!!i && ', '}
                  {renderPersonNameWithLink(relative)} ({relative.relation})
                </span>
              ))}
            </p>
          )}
          {!!info.otherWorks?.length && (
            <p>
              <span>Other Works: </span>
              {info.otherWorks.map((work, i) => (
                <span key={work.text}>
                  {!!i && ', '}
                  <span dangerouslySetInnerHTML={{ __html: work.text }} />
                </span>
              ))}
            </p>
          )}
          {!!info.publicity.total && (
            <p>
              <span>Publicity Listings: </span>
              <span>{info.publicity.articles} Articles</span>,{' '}
              <span>{info.publicity.interviews} Interviews</span>,{' '}
              <span>{info.publicity.magazines} Magazines</span>,{' '}
              <span>{info.publicity.pictorials} Pictorials</span>,{' '}
              <span>{info.publicity.printBiographies} Print biographies</span>, and{' '}
              <span>{info.publicity.filmBiographies} Biographies</span>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PersonalDetails;

const renderPersonNameWithLink = (person: { name: string; id: string | null }) =>
  person.id ? (
    <Link href={`/name/${person.id}`}>
      <a className='link'>{person.name}</a>
    </Link>
  ) : (
    <span>{person.name}</span>
  );
