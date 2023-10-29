import { NextApiRequest, NextApiResponse } from 'next';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import list from 'src/utils/fetchers/list';
import { listKey } from 'src/utils/constants/keys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const listId = req.query.listId;
  const pageNum = (req.query.page as string | undefined) ?? '1';

  try {
    const data = await getOrSetApiCache(listKey(listId, pageNum), list, listId, pageNum);
    res.status(200);
    res.json(data);
  } catch (error: any) {
    const { message, statusCode } = error;
    res.status(statusCode);
    res.json({
	  success: false,
	  message: message
	 });
  }
}
