export const titleKey = (titleId: string) => `title:${titleId}`;
export const nameKey = (nameId: string) => `name:${nameId}`;
export const listKey = (listId: string, pageNum = '1') => `list:${listId}?page=${pageNum}`;
export const findKey = (query: string) => `find:${query}`;
export const mediaKey = (url: string) => `media:${url}`;
