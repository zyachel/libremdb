import { NextApiRequest, NextApiResponse } from 'next';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import title from 'src/utils/fetchers/title';
import { titleKey } from 'src/utils/constants/keys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const titleId = req.query.titleId;

  try {
    const data = await getOrSetApiCache(titleKey(titleId), title, titleId);
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
