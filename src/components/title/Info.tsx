import Link from 'next/link';
import { useRouter } from 'next/router';
import { Info } from '../../interfaces/shared/title';
import { formatMoney, formatTime } from '../../utils/helpers';

import styles from '../../styles/modules/components/title/info.module.scss';

type Props = {
  info: Info;
  className: string;
};

const Info = ({ info, className }: Props) => {
  const router = useRouter();
  const { titleId } = router.query;
  const { boxOffice, details, meta, keywords, technicalSpecs, accolades } =
    info;

  return (
    <div className={`${className} ${styles.info}`}>
      {meta.infoEpisode && (
        <section className={styles.episodeInfo}>
          <h2 className="heading heading__secondary">Episode info</h2>
          <div className={styles.episodeInfo__container}>
            {meta.infoEpisode.numSeason && (
              <p className={styles.series}>
                <span>Season: </span>
                <span>{meta.infoEpisode.numSeason}</span>
              </p>
            )}
            {meta.infoEpisode.numEpisode && (
              <p>
                <span>Episode: </span>
                <span>{meta.infoEpisode.numEpisode}</span>
              </p>
            )}
            <p>
              <span>Series: </span>
              <span>
                <Link href={`/title/${meta.infoEpisode.series.id}`}>
                  <a className={'link'}>{meta.infoEpisode.series.title}</a>
                </Link>
                <span>
                  {' '}
                  ({meta.infoEpisode.series.startYear}-
                  {meta.infoEpisode.series.endYear || 'present'})
                </span>
              </span>
            </p>
            {meta.infoEpisode.prevId && (
              <p>
                <Link href={`/title/${meta.infoEpisode.prevId}`}>
                  <a className="link">Go to previous episode</a>
                </Link>
              </p>
            )}
            {meta.infoEpisode.nextId && (
              <p>
                <Link href={`/title/${meta.infoEpisode.nextId}`}>
                  <a className="link">Go to next episode</a>
                </Link>
              </p>
            )}
          </div>
        </section>
      )}
      {meta.infoSeries && (
        <section className={styles.seriesInfo}>
          <h2 className="heading heading__secondary">Series info</h2>
          <div className={styles.seriesInfo__container}>
            <p>
              <span>Total Seasons: </span>
              <span>{meta.infoSeries.seasons.length}</span>
            </p>
            <p>
              <span>Total Years: </span>
              <span>{meta.infoSeries.years.length}</span>
            </p>
            <p>
              <span>Total Episodes: </span>
              <span>{meta.infoSeries.totalEpisodes}</span>
            </p>
            <p>
              <Link href={`/title/${titleId}/episodes`}>
                <a className="link">See all Episodes</a>
              </Link>
            </p>
          </div>
        </section>
      )}
      <section className={styles.accolades}>
        <h2 className="heading heading__secondary">Accolades</h2>
        <div className={styles.accolades__container}>
          {accolades.topRating && (
            <p>
              <Link href={`/chart/top`}>
                <a className="link">Top rated (#{accolades.topRating})</a>
              </Link>
            </p>
          )}
          {accolades.awards && (
            <p>
              <span>
                Won {accolades.awards.wins} {accolades.awards.name}
              </span>
              <span> (out of {accolades.awards.nominations} nominations)</span>
            </p>
          )}
          <p>
            {accolades.wins} wins and {accolades.nominations} nominations in
            total
          </p>
          <p>
            <Link href={`/title/${titleId}/awards`}>
              <a className="link">View all awards</a>
            </Link>
          </p>
        </div>
      </section>
      {!!keywords.total && (
        <section className={styles.keywords}>
          <h2 className="heading heading__secondary">Keywords</h2>
          <ul className={styles.keywords__container}>
            {keywords.list.map(word => (
              <li className={styles.keywords__item} key={word}>
                <Link
                  href={`/search/keyword/?keywords=${word.replace(/\s/g, '-')}`}
                >
                  <a className="link">{word}</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {!!Object.keys(details).length && (
        <section className={styles.details}>
          <h2 className="heading heading__secondary">Details</h2>
          <div className={styles.details__container}>
            {details.releaseDate && (
              <p>
                <span>Release date: </span>
                <time dateTime={details.releaseDate.date}>
                  {details.releaseDate.date}
                </time>
                <span> ({details.releaseDate.country.text})</span>
              </p>
            )}

            {details.countriesOfOrigin && (
              <p>
                <span>Countries of origin: </span>
                {details.countriesOfOrigin.map((country, i) => (
                  <span key={country.id}>
                    {!!i && ', '}
                    <Link
                      href={`/search/title/?country_of_origin=${country.id}`}
                    >
                      <a className="link">{country.text}</a>
                    </Link>
                  </span>
                ))}
              </p>
            )}
            {details.officialSites && (
              <p>
                <span>Official sites: </span>
                {details.officialSites.sites.map((site, i) => (
                  <span key={site.url}>
                    {!!i && ', '}
                    <a href={site.url} className="link">
                      {site.name}
                    </a>
                  </span>
                ))}
              </p>
            )}
            {details.languages?.length && (
              <p>
                <span>Languages: </span>
                {details.languages.map((lang, i) => (
                  <span key={lang.id}>
                    {!!i && ', '}
                    <Link href={`/search/title/?primary_language=${lang.id}`}>
                      <a className="link">{lang.text}</a>
                    </Link>
                  </span>
                ))}
              </p>
            )}
            {details.alsoKnownAs && (
              <p>
                <span>Also known as: </span>
                <span>{details.alsoKnownAs}</span>
              </p>
            )}
            {details.filmingLocations?.total && (
              <p>
                <span>Filming locations: </span>
                {details.filmingLocations.locations.map((loc, i) => (
                  <span key={loc}>
                    {!!i && ', '}
                    <Link href={`/search/title/?locations=${loc}`}>
                      <a className="link">{loc}</a>
                    </Link>
                  </span>
                ))}
              </p>
            )}
            {!!details.production?.total && (
              <p>
                <span>Production companies: </span>
                {details.production.companies.map((co, i) => (
                  <span key={co.id}>
                    {!!i && ', '}
                    <Link href={`/company/${co.id}`}>
                      <a className="link">{co.name}</a>
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>
      )}
      {!!Object.keys(boxOffice).length && (
        <section className={styles.boxoffice}>
          <h2 className="heading heading__secondary">Box office</h2>
          <div className={styles.boxoffice__container}>
            {boxOffice.budget && (
              <p>
                <span>Budget: </span>
                <span>
                  {formatMoney(
                    boxOffice.budget.amount,
                    boxOffice.budget.currency
                  )}
                </span>
              </p>
            )}
            {boxOffice.grossUs && (
              <p>
                <span>Gross US & Canada: </span>
                <span>
                  {formatMoney(
                    boxOffice.grossUs.amount,
                    boxOffice.grossUs.currency
                  )}
                </span>
              </p>
            )}
            {boxOffice.openingGrossUs && (
              <p>
                <span>Opening weekend US & Canada: </span>
                <span>
                  {formatMoney(
                    boxOffice.openingGrossUs.amount,
                    boxOffice.openingGrossUs.currency
                  )}
                  <span> ({boxOffice.openingGrossUs.date})</span>
                </span>
              </p>
            )}
            {boxOffice.gross && (
              <p>
                <span>Gross worldwide: </span>
                <span>
                  {formatMoney(
                    boxOffice.gross.amount,
                    boxOffice.gross.currency
                  )}
                </span>
              </p>
            )}
          </div>
        </section>
      )}
      {!!Object.keys(technicalSpecs).length && (
        <section className={styles.technical}>
          <h2 className="heading heading__secondary">Technical specs</h2>
          <div className={styles.technical__container}>
            {technicalSpecs.runtime && (
              <p>
                <span>Runtime: </span>
                <span>{formatTime(technicalSpecs.runtime)}</span>
              </p>
            )}
            {!!technicalSpecs.colorations?.length && (
              <p>
                <span> Color: </span>
                <span>
                  {technicalSpecs.colorations.map((color, i) => (
                    <span key={color.id}>
                      {!!i && ', '}
                      <Link href={`/search/title/?colors=${color.id}`}>
                        <a className="link">{color.name}</a>
                      </Link>
                    </span>
                  ))}
                </span>
              </p>
            )}
            {!!technicalSpecs.soundMixes?.length && (
              <p>
                <span>Sound mix: </span>
                <span>
                  {technicalSpecs.soundMixes?.map((sound, i) => (
                    <span key={sound.id}>
                      {!!i && ', '}
                      <Link href={`/search/title/?sound_mixes=${sound.id}`}>
                        <a className="link">{sound.name}</a>
                      </Link>
                    </span>
                  ))}
                </span>
              </p>
            )}
            {!!technicalSpecs.aspectRatios?.length && (
              <p>
                <span>Aspect ratio: </span>
                <span>{technicalSpecs.aspectRatios.join(', ')}</span>
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
export default Info;
