import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Meta from 'src/components/meta/Meta';
import Layout from 'src/components/layout';
import ErrorInfo from 'src/components/error/ErrorInfo';
import Trivia from 'src/interfaces/shared/trivia';
import type { AppError } from 'src/interfaces/shared/error';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import trivia from 'src/utils/fetchers/titleTrivia';
import { getErrorProperties, getProxiedIMDbImgUrl } from 'src/utils/helpers';
import { titleTriviaKey } from 'src/utils/constants/keys';
import styles from 'src/styles/modules/pages/title/trivia.module.scss';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const TriviaPage = ({ data, error, originalPath }: Props) => {
  const [regularItems, setRegularItems] = useState(
    data?.items?.filter(item => !item.isSpoiler) || []
  );
  const [spoilerItems, setSpoilerItems] = useState(
    data?.items?.filter(item => item.isSpoiler) || []
  );
  const [regularPage, setRegularPage] = useState(1);
  const [spoilerPage, setSpoilerPage] = useState(1);
  const [isLoadingRegular, setIsLoadingRegular] = useState(false);
  const [isLoadingSpoiler, setIsLoadingSpoiler] = useState(false);
  const [isLoadingAllRegular, setIsLoadingAllRegular] = useState(false);
  const [isLoadingAllSpoiler, setIsLoadingAllSpoiler] = useState(false);
  const [hasMoreRegular, setHasMoreRegular] = useState<boolean>(data?.hasMore || false);
  const [hasMoreSpoiler, setHasMoreSpoiler] = useState<boolean>(data?.hasMore || false);
  const [totalRegular, setTotalRegular] = useState(0);
  const [totalSpoiler, setTotalSpoiler] = useState(0);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  // Calculate totals for each category on mount
  useEffect(() => {
    if (data?.items) {
      const regularCount = data.items.filter(item => !item.isSpoiler).length;
      const spoilerCount = data.items.filter(item => item.isSpoiler).length;

      // Estimate totals based on ratio if we don't have exact counts
      if (data.total > 0 && regularCount + spoilerCount > 0) {
        const ratio = data.total / (regularCount + spoilerCount);
        setTotalRegular(Math.ceil(regularCount * ratio));
        setTotalSpoiler(Math.ceil(spoilerCount * ratio));
      }
    }
  }, [data]);

  if (error) return <ErrorInfo {...error} originalPath={originalPath} />;

  const { meta, total } = data;
  const totalItems = regularItems.length + spoilerItems.length;

  const loadMoreRegular = async () => {
    if (isLoadingRegular || !hasMoreRegular) return;

    setIsLoadingRegular(true);
    try {
      const response = await fetch(`/api/title/${meta.titleId}/trivia?page=${regularPage + 1}`);
      const newData = await response.json();

      if (newData.items && newData.items.length > 0) {
        const regular = newData.items.filter((item: any) => !item.isSpoiler);

        if (regular.length > 0) {
          setRegularItems(prev => [...prev, ...regular]);
          setRegularPage(prev => prev + 1);
        }

        setHasMoreRegular(newData.hasMore);
      } else {
        setHasMoreRegular(false);
      }
    } catch (err) {
      console.error('Error loading more regular trivia:', err);
      setHasMoreRegular(false);
    } finally {
      setIsLoadingRegular(false);
    }
  };

  const loadMoreSpoiler = async () => {
    if (isLoadingSpoiler || !hasMoreSpoiler) return;

    setIsLoadingSpoiler(true);
    try {
      const response = await fetch(`/api/title/${meta.titleId}/trivia?page=${spoilerPage + 1}`);
      const newData = await response.json();

      if (newData.items && newData.items.length > 0) {
        const spoilers = newData.items.filter((item: any) => item.isSpoiler);

        if (spoilers.length > 0) {
          setSpoilerItems(prev => [...prev, ...spoilers]);
          setSpoilerPage(prev => prev + 1);
        }

        setHasMoreSpoiler(newData.hasMore);
      } else {
        setHasMoreSpoiler(false);
      }
    } catch (err) {
      console.error('Error loading more spoiler trivia:', err);
      setHasMoreSpoiler(false);
    } finally {
      setIsLoadingSpoiler(false);
    }
  };

  const loadAllRegular = async () => {
    if (isLoadingAllRegular || !hasMoreRegular) return;

    setIsLoadingAllRegular(true);
    try {
      let currentPage = regularPage + 1;
      let hasMore: boolean = hasMoreRegular;

      while (hasMore) {
        const response = await fetch(`/api/title/${meta.titleId}/trivia?page=${currentPage}`);
        const newData = await response.json();

        if (newData.items && newData.items.length > 0) {
          const regular = newData.items.filter((item: any) => !item.isSpoiler);

          if (regular.length > 0) {
            setRegularItems(prev => [...prev, ...regular]);
          }

          hasMore = newData.hasMore;
          currentPage++;
        } else {
          hasMore = false;
        }
      }

      setRegularPage(currentPage - 1);
      setHasMoreRegular(false);
    } catch (err) {
      console.error('Error loading all regular trivia:', err);
      setHasMoreRegular(false);
    } finally {
      setIsLoadingAllRegular(false);
    }
  };

  const loadAllSpoiler = async () => {
    if (isLoadingAllSpoiler || !hasMoreSpoiler) return;

    setIsLoadingAllSpoiler(true);
    try {
      let currentPage = spoilerPage + 1;
      let hasMore: boolean = hasMoreSpoiler;

      while (hasMore) {
        const response = await fetch(`/api/title/${meta.titleId}/trivia?page=${currentPage}`);
        const newData = await response.json();

        if (newData.items && newData.items.length > 0) {
          const spoilers = newData.items.filter((item: any) => item.isSpoiler);

          if (spoilers.length > 0) {
            setSpoilerItems(prev => [...prev, ...spoilers]);
          }

          hasMore = newData.hasMore;
          currentPage++;
        } else {
          hasMore = false;
        }
      }

      setSpoilerPage(currentPage - 1);
      setHasMoreSpoiler(false);
    } catch (err) {
      console.error('Error loading all spoiler trivia:', err);
      setHasMoreSpoiler(false);
    } finally {
      setIsLoadingAllSpoiler(false);
    }
  };

  const copyLinkToClipboard = (index: number, isSpoiler: boolean) => {
    const anchor = isSpoiler ? `spoiler-${index}` : `regular-${index}`;
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    });
  };

  return (
    <>
      <Meta
        title={`${meta.title} ${meta.year} - Trivia`}
        description={`Trivia for ${meta.title}`}
        imgUrl={meta.image ? getProxiedIMDbImgUrl(meta.image) : undefined}
      />
      <Layout className={styles.trivia} originalPath={originalPath}>
        <>
          {showCopiedToast && (
            <div
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                zIndex: 1000,
                animation: 'fadeIn 0.3s ease-in',
              }}
            >
              ✓ Link copied to clipboard!
            </div>
          )}
          <div className={styles.trivia}>
            <div className={styles.backLink}>
              <Link href={`/title/${meta.titleId}`}>
                <a className='link'>← Back to {meta.title}</a>
              </Link>
            </div>

            <div className={styles.header}>
              <h1 className='heading heading__primary'>
                {meta.title} {meta.year}
              </h1>
            </div>

            <section className={styles.section}>
              <h2 className={`heading heading__secondary ${styles.sectionHeader}`}>
                Trivia
                {total > 0 && (
                  <span className={styles.count}>
                    ({totalItems} of {total} {total === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>

              {totalItems > 0 ? (
                <>
                  {regularItems.length > 0 && (
                    <>
                      <h3 className='heading heading__tertiary' style={{ marginBottom: '1rem' }}>
                        Regular Trivia ({regularItems.length}
                        {totalRegular > 0 && ` of ${totalRegular}`})
                      </h3>
                      <div className={styles.triviaList}>
                        {regularItems.map((item, index) => (
                          <div
                            key={`regular-${index}`}
                            id={`regular-${index}`}
                            className={styles.triviaItem}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '0.5rem',
                              }}
                            >
                              <span style={{ color: '#888', fontSize: '0.85rem' }}>
                                #{index + 1}
                              </span>
                              <button
                                onClick={() => copyLinkToClipboard(index, false)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#888',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  padding: '0.25rem 0.5rem',
                                }}
                                title='Copy link to this trivia'
                              >
                                🔗 Share
                              </button>
                            </div>
                            <div
                              className={styles.triviaContent}
                              dangerouslySetInnerHTML={{ __html: item.html }}
                            />
                          </div>
                        ))}
                      </div>

                      {hasMoreRegular && (
                        <div className={styles.loadMoreContainer}>
                          <button
                            onClick={loadMoreRegular}
                            disabled={isLoadingRegular || isLoadingAllRegular}
                            className={styles.loadMoreButton}
                            style={{ marginRight: '1rem' }}
                          >
                            {isLoadingRegular ? 'Loading...' : 'Load More'}
                          </button>
                          <button
                            onClick={loadAllRegular}
                            disabled={isLoadingAllRegular || isLoadingRegular}
                            className={styles.loadMoreButton}
                            style={{ backgroundColor: '#5799ef' }}
                          >
                            {isLoadingAllRegular ? 'Loading All...' : 'Load All Regular Trivia'}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {spoilerItems.length > 0 && (
                    <>
                      <h3
                        className='heading heading__tertiary'
                        style={{ marginTop: '3rem', marginBottom: '1rem' }}
                      >
                        Spoiler Trivia ({spoilerItems.length}
                        {totalSpoiler > 0 && ` of ${totalSpoiler}`})
                      </h3>
                      <div className={styles.triviaList}>
                        {spoilerItems.map((item, index) => (
                          <div
                            key={`spoiler-${index}`}
                            id={`spoiler-${index}`}
                            className={styles.triviaItemSpoiler}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '0.5rem',
                              }}
                            >
                              <div>
                                <div className={styles.spoilerBadge}>⚠ Spoiler</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                                  #{index + 1}
                                </span>
                                <button
                                  onClick={() => copyLinkToClipboard(index, true)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#888',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    padding: '0.25rem 0.5rem',
                                  }}
                                  title='Copy link to this trivia'
                                >
                                  🔗 Share
                                </button>
                              </div>
                            </div>
                            <div
                              className={styles.triviaContent}
                              dangerouslySetInnerHTML={{ __html: item.html }}
                            />
                          </div>
                        ))}
                      </div>

                      {hasMoreSpoiler && (
                        <div className={styles.loadMoreContainer}>
                          <button
                            onClick={loadMoreSpoiler}
                            disabled={isLoadingSpoiler || isLoadingAllSpoiler}
                            className={styles.loadMoreButton}
                            style={{ marginRight: '1rem' }}
                          >
                            {isLoadingSpoiler ? 'Loading...' : 'Load More'}
                          </button>
                          <button
                            onClick={loadAllSpoiler}
                            disabled={isLoadingAllSpoiler || isLoadingSpoiler}
                            className={styles.loadMoreButton}
                            style={{ backgroundColor: '#5799ef' }}
                          >
                            {isLoadingAllSpoiler ? 'Loading All...' : 'Load All Spoiler Trivia'}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>No trivia available for this title.</p>
                </div>
              )}
            </section>
          </div>
        </>
      </Layout>
    </>
  );
};

type Data = ({ data: Trivia; error: null } | { error: AppError; data: null }) & {
  originalPath: string;
};
type Params = { titleId: string };

export const getServerSideProps: GetServerSideProps<Data, Params> = async ctx => {
  const titleId = ctx.params!.titleId;
  const originalPath = ctx.resolvedUrl;

  try {
    // Fetch only the first page on server-side
    const cacheKey = `${titleTriviaKey(titleId)}:page:1`;
    const data = await getOrSetApiCache(cacheKey, trivia, titleId, 1);

    return { props: { data, error: null, originalPath } };
  } catch (e) {
    const err = getErrorProperties(e);
    ctx.res.statusCode = err.statusCode;
    ctx.res.statusMessage = err.message;

    const error = {
      message: err.message,
      statusCode: err.statusCode,
      stack: err.format(),
    };
    console.error(err);
    return { props: { error, data: null, originalPath } };
  }
};

export default TriviaPage;
