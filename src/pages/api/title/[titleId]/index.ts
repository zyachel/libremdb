import type { NextApiRequest, NextApiResponse } from 'next';
import type Title from 'src/interfaces/shared/title';
import title from 'src/utils/fetchers/title';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { titleKey } from 'src/utils/constants/keys';
import { AppError } from 'src/utils/helpers';

type ResponseData = { status: true; data: Title } | { status: false; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method !== 'GET') throw new AppError('Invalid method', 400);

    const titleId = req.query.titleId as string;
    const data = await getOrSetApiCache(titleKey(titleId), title, titleId);
    res.status(200).json({ status: true, data });
  } catch (error: any) {
    const { message = 'Not found', statusCode = 404 } = error;
    res.status(statusCode).json({ status: false, message });
  }
}
