import type Name from './name';

export type Media = Name['media']; // exactly the same in title and name

// forcefully makes array of individual elements of T, where t is any conditional type.
export type ToArray<T> = T extends any ? T[] : never;
