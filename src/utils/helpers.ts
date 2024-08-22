import {
  ResultMetaTitleTypes,
  ResultMetaTypes,
} from 'src/interfaces/shared/search';
import { resultTitleTypes } from './constants/find';

export const formatTime = (timeInSecs: number) => {
  if (!timeInSecs) return;
  // year, month, date, hours, minutes, seconds
  // (passing all except seconds zero because they don't matter. seconds will overflow to minutes and hours.)
  const dateObj = new Date(0, 0, 0, 0, 0, timeInSecs);
  const days = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  // example for movie runtime spanning days: /title/tt0284020
  return `${days === 31 ? '' : days + 'd'} ${!hours ? '' : hours + 'h'} ${
    !minutes ? '' : minutes + 'm'
  } ${!seconds ? '' : seconds + 's'}`.trim();
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
  }).format(num);
};
export function formatDate(dateStr: string): string;
export function formatDate(year: number, month: number, date: number): string;
export function formatDate(
  dateStrOrYear: unknown,
  month?: unknown,
  date?: unknown
) {
  const options = { dateStyle: 'medium' } as const;
  if (
    typeof dateStrOrYear === 'string' &&
    typeof month === 'undefined' &&
    typeof date === 'undefined'
  )
    return new Date(dateStrOrYear).toLocaleString('en-US', options);

  return new Date(
    dateStrOrYear as number,
    month as number,
    date as number
  ).toLocaleString('en-US', options);
}

export const formatMoney = (num: number, cur: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cur,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(num);
};

const imageRegex = /https:\/\/m\.media-amazon\.com\/images\/M\/[^.]*/;

export const modifyIMDbImg = (url: string, widthInPx = 600) => {
  // as match returns either array or null, returning array in case it returns null. and destructuring it right away.
  const [cleanImg] = url.match(imageRegex) || [];

  if (cleanImg) return `${cleanImg}.UX${widthInPx}.jpg`;
  return url;
};

const placeholderImageRegex = /https:\/\/m\.media-amazon.com\/images\/.{1}\/sash\/.*/;
export const isIMDbImgPlaceholder = (url?: string | null) => url ? placeholderImageRegex.test(url) : false;

export const getProxiedIMDbImgUrl = (url: string) => {
  return `/api/media_proxy?url=${encodeURIComponent(url)}`;
};

export const AppError = class extends Error {
  constructor(message: string, public statusCode: number, errorOptions?: unknown) {
    const saneErrorOptions = getErrorOptions(errorOptions);
    super(message, saneErrorOptions);

    Error.captureStackTrace(this, AppError);
    if (process.env.NODE_ENV === 'development') console.error(this);
  }
};

export const cleanQueryStr = (record: Record<string, string>, filterable: string[]) => {
  const urlSearchParams = new URLSearchParams();

  filterable.forEach(key => {
    if (record[key]) urlSearchParams.append(key, record[key].trim());
  });
  return urlSearchParams.toString();
};

export const getResTitleTypeHeading = (type: ResultMetaTypes, titleType: ResultMetaTitleTypes) => {
  if (type !== 'TITLE') return 'Titles';

  for (let i = 0; i < resultTitleTypes.types.length; i++) {
    const el = resultTitleTypes.types[i];
    if (el.id === titleType) return el.name;
  }
};

export const isLocalStorageAvailable = () => {
  try {
    localStorage.getItem('test');
    return true;
  } catch (e) {
    return false;
  }
};

const getErrorOptions = (error: unknown): ErrorOptions | undefined => {
  if (!error || typeof error !== 'object') return undefined;

  let cause: unknown;
  // @ts-expect-error it's not an error! just that project's ts version is old, which can't be upgraded
  if ('cause' in error) cause = error.cause;
  // @ts-expect-error it's not an error! just that project's ts version is old, which can't be upgraded
  else if ('stack' in error) cause = error.stack;

  // @ts-expect-error it's not an error! just that project's ts version is old, which can't be upgraded
  return { cause };
};

export const getErrorProperties = (
  error: unknown,
  message = 'Something went very wrong',
  statusCode = 500
) => {
  if (error instanceof AppError) return error;
  return new AppError(message, statusCode, error);
};