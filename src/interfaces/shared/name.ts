import cleanName from 'src/utils/cleaners/name';

type Name = ReturnType<typeof cleanName>;
export type { Name as default };

export type Basic = Name['basic'];

export type Media = Name['media'];

export type Credits = Name['credits'];

export type DidYouKnow = Name['didYouKnow'];

export type PersonalDetails = Name['personalDetails'];

export type KnownFor = Name['knownFor'];
