import { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../utils/redis';
import axiosInstance from '../../utils/axiosInstance';

const regex =
  /^https:\/\/((m\.)?media-amazon\.com|imdb-video\.media-imdb\.com).*\.(jpg|jpeg|png|mp4|gif|webp).*$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mediaUrl = req.query.url as string | undefined;

    // 1. returning if query is illegal
    if (!mediaUrl || !regex.test(mediaUrl))
      return res.status(400).json({
        success: false,
        message: 'Invalid query',
      });

    // 2. sending streamed response if redis isn't enabled
    if (redis === null) {
      const mediaRes = await axiosInstance.get(mediaUrl, {
        responseType: 'stream',
      });

      res.setHeader('Content-Type', mediaRes.headers['content-type']);
      mediaRes.data.pipe(res);
      return;
    }

    // 3. else if resourced is cached, sending it
    const cachedMedia = await redis!.getBuffer(mediaUrl);

    if (cachedMedia) {
      res.setHeader('x-cached', 'true');
      res.status(302).send(cachedMedia);
      return;
    }

    // 4. else getting, caching and sending response
    const mediaRes = await axiosInstance(mediaUrl, {
      responseType: 'arraybuffer',
    });

    const data = mediaRes.data;

    // saving in redis for 30 minutes
    await redis!.setex(mediaUrl, 30 * 60, Buffer.from(data));

    // sending media
    res.setHeader('x-cached', 'false');
    res.send(data);

    // sending token response on any error
  } catch {
    res.status(404);
    res.json({
      success: false,
      message: 'something went wrong',
    });
    return;
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
