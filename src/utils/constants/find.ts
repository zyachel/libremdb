/**
 * @constant
 *
 * key: the key for the query that we make to fetch results
 *
 * name: Nice name to display on the client side
 *
 * val: the value that is associated with the key. also used to fetch results.
 *
 * **IMPORTANT**: see sample response from backend, and form submission url to better understand how these objects are used.
 */
export const resultTypes = {
  types: [
    { name: 'Titles', val: 'tt', id: 'TITLE' },
    { name: 'People', val: 'nm', id: 'NAME' },
    { name: 'Companies', val: 'co', id: 'COMPANY' },
    { name: 'Keywords', val: 'kw', id: 'KEYWORD' },
  ],
  key: 's',
} as const;

/**
 * same as {@link resultTypes}.
 */
export const resultTitleTypes = {
  types: [
    { name: 'Movies', val: 'ft', id: 'MOVIE' },
    { name: 'TV', val: 'tv', id: 'TV' },
    { name: 'TV Episodes', val: 'ep', id: 'TV_EPISODE' },
    { name: 'Music Videos', val: 'mu', id: 'MUSIC_VIDEO' },
    { name: 'Podcasts', val: 'ps', id: 'PODCAST_SERIES' },
    { name: 'Podcast Episodes', val: 'pe', id: 'PODCAST_EPISODE' },
    { name: 'Video Games', val: 'vg', id: 'VIDEO_GAME' },
  ],
  key: 'ttype',
} as const;

export const findFilterable = ['q', 'exact', resultTitleTypes.key, resultTypes.key]; 
