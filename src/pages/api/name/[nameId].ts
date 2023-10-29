import { NextApiRequest, NextApiResponse } from 'next';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import name from 'src/utils/fetchers/name';
import { nameKey } from 'src/utils/constants/keys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const nameId = req.query.nameId;

  try {
    const data = await getOrSetApiCache(nameKey(nameId), name, nameId);
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
