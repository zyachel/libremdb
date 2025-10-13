import type { NextApiRequest, NextApiResponse } from 'next';
import trivia from 'src/utils/fetchers/titleTrivia';
import { getErrorProperties } from 'src/utils/helpers';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { titleTriviaKey } from 'src/utils/constants/keys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { titleId, page } = req.query;

  if (typeof titleId !== 'string') {
    return res.status(400).json({ error: 'Invalid title ID' });
  }

  const pageNum = typeof page === 'string' ? parseInt(page, 10) : 1;

  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  try {
    // Cache each page separately
    const cacheKey = `${titleTriviaKey(titleId)}:page:${pageNum}`;
    const data = await getOrSetApiCache(cacheKey, trivia, titleId, pageNum);

    return res.status(200).json(data);
  } catch (e) {
    const err = getErrorProperties(e);
    console.error('Error fetching trivia:', err);
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  }
}
