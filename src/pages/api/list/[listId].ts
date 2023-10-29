import type { NextApiRequest, NextApiResponse } from 'next';
import type List from 'src/interfaces/shared/list';
import list from 'src/utils/fetchers/list';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { listKey } from 'src/utils/constants/keys';
import { AppError } from 'src/utils/helpers';

type ResponseData = { status: true; data: List } | { status: false; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method !== 'GET') throw new AppError('Invalid method', 400);

    const listId = req.query.listId as string;
    const pageNum = req.query.page as string | undefined;

    const data = await getOrSetApiCache(listKey(listId, pageNum), list, listId, pageNum);
    res.status(200).json({ status: true, data });
  } catch (error: any) {
    const { message = 'Not found', statusCode = 404 } = error;
    res.status(statusCode).json({ status: false, message });
  }
}
