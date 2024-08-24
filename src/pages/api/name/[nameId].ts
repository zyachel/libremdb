import type { NextApiRequest, NextApiResponse } from 'next';
import type Name from 'src/interfaces/shared/name';
import name from 'src/utils/fetchers/name';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { nameKey } from 'src/utils/constants/keys';
import { AppError, getErrorProperties } from 'src/utils/helpers';

type ResponseData = { status: true; data: Name } | { status: false; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method !== 'GET') throw new AppError('Invalid method', 400);

    const nameId = req.query.nameId as string;

    const data = await getOrSetApiCache(nameKey(nameId), name, nameId);
    res.status(200).json({ status: true, data });
  } catch (error) {
    const { message, statusCode } = getErrorProperties(error);

    res.status(statusCode).json({ status: false, message });
  }
}
