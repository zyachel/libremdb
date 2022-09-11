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
  }).format(num);
};

export const modifyIMDbImg = (url: string, widthInPx = 600) => {
  return url.replaceAll('.jpg', `UX${widthInPx}.jpg`);
};

export const AppError = class extends Error {
  constructor(message: string, public statusCode: number, cause?: any) {
    super(message, cause);

    Error.captureStackTrace(this, AppError);
  }
};
