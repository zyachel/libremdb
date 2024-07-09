import episodes from 'src/utils/fetchers/titleEpisodes';

type TitleEpisodes = Awaited<ReturnType<typeof episodes>>;
export type { TitleEpisodes as default };
