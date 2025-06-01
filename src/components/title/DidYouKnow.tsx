import Link from 'next/link';
import { DidYouKnow } from 'src/interfaces/shared/title';
import styles from 'src/styles/modules/components/title/did-you-know.module.scss';

type Props = {
  data: DidYouKnow;
};

const DidYouKnow = ({ data }: Props) => {
  if (!Object.keys(data).length)
    return (
      <section className={styles.didYouKnow}>
        <h2 className='heading heading__secondary'>Did you know</h2>
        <p>Nothing interesting to show.</p>
      </section>
    );
  return (
    <section className={styles.didYouKnow}>
      <h2 className='heading heading__secondary'>Did you know</h2>
      <div className={styles.container}>
        {data.trivia && (
          <div className={styles.item}>
            <h3 className='heading heading__tertiary'>Trivia</h3>
            <div
              className={styles.item__desc}
              dangerouslySetInnerHTML={{ __html: data.trivia.html }}
            ></div>
          </div>
        )}
        {data.goofs && (
          <div className={styles.item}>
            <h3 className='heading heading__tertiary'>Goofs</h3>
            <div
              className={styles.item__desc}
              dangerouslySetInnerHTML={{ __html: data.goofs.html }}
            ></div>
          </div>
        )}
        {data.quotes?.lines.length && (
          // html spec says not to use blockquote & cite for conversations, even though it seems a perfect choice here.
          // see 'note' part https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element
          <div className={styles.item}>
            <h3 className='heading heading__tertiary'>Quotes</h3>
            {data.quotes.lines.map((line, i) => (
              <div className={styles.quotes} key={i}>
                <p className={styles.quote}>
                  {line.name && (
                    <Link href={`/name/${line.id}`}>
                      <a className={'link'}>{line.name}</a>
                    </Link>
                  )}
                  {line.stageDirection && <i> [{line.stageDirection}] </i>}
                  {line.text && <span>: {line.text}</span>}
                </p>
              </div>
            ))}
          </div>
        )}
        {data.crazyCredits && (
          <div className={styles.item}>
            <h3 className='heading heading__tertiary'>Crazy credits</h3>
            <div
              className={styles.item__desc}
              dangerouslySetInnerHTML={{ __html: data.crazyCredits.html }}
            ></div>
          </div>
        )}
        {data.alternativeVersions && (
          <div className={styles.item}>
            <h3 className='heading heading__tertiary'>Alternate versions</h3>
            <div
              className={styles.item__desc}
              dangerouslySetInnerHTML={{
                __html: data.alternativeVersions.html,
              }}
            ></div>
          </div>
        )}
        {data.connections && (
          <div className={styles.item}>
            <h3 className='heading heading__tertiary'>Connections</h3>
            <p className={styles.item__desc}>
              <span>{data.connections.startText} </span>
              <Link href={`/title/${data.connections.title.id}`}>
                <a className={'link'}>{data.connections.title.text}</a>
              </Link>
              <span> ({data.connections.title.year})</span>
            </p>
          </div>
        )}
        {data.soundTrack && (
          <div className={styles.item}>
            <h3 className='heading heading__tertiary'>Soundtracks</h3>
            <div className={styles.list}>
              <p>{data.soundTrack.title}</p>
              {data.soundTrack.htmls &&
                data.soundTrack.htmls.map(html => (
                  <div
                    key={html}
                    className={styles.item__desc}
                    dangerouslySetInnerHTML={{ __html: html }}
                  ></div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default DidYouKnow;
