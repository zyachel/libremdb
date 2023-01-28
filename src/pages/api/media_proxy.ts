import { NextApiRequest, NextApiResponse } from 'next';
import redis from 'src/utils/redis';
import axiosInstance from 'src/utils/axiosInstance';

const getCleanReqHeaders = (headers: NextApiRequest['headers']) => ({
  ...(headers.accept && { accept: headers.accept }),
  ...(headers.range && { range: headers.range }),
  ...(headers['accept-encoding'] && {
    'accept-encoding': headers['accept-encoding'] as string,
  }),
});

const resHeadersArr = [
  'content-range',
  'content-length',
  'content-type',
  'accept-ranges',
];

// checks if a url is pointing towards a video/image from imdb
const regex =
  /^https:\/\/((m\.)?media-amazon\.com|imdb-video\.media-imdb\.com).*\.(jpg|jpeg|png|mp4|gif|webp).*$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mediaUrl = req.query.url as string | undefined;
    const requestHeaders = getCleanReqHeaders(req.headers);

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
        headers: requestHeaders,
      });

      // chromium browsers want a 206 response with specific headers. so, we gotta pass them on.
      res.statusCode = mediaRes.status;
      resHeadersArr.forEach(key => {
        const val = mediaRes.headers[key];
        if (val) res.setHeader(key, val);
      });
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

    const { data } = mediaRes;

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
