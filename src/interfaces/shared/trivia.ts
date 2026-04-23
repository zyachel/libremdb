import trivia from 'src/utils/fetchers/titleTrivia';

type Trivia = Awaited<ReturnType<typeof trivia>>;
export type { Trivia as default };

export type TriviaItem = Trivia['items'][0];
export type TriviaMeta = Trivia['meta'];
