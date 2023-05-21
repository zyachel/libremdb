import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosRequestHeaders } from 'axios';
import redis from 'src/utils/redis';
import axiosInstance from 'src/utils/axiosInstance';
import { mediaKey } from 'src/utils/constants/keys';

const dontCacheMedia =
  process.env.USE_REDIS_FOR_API_ONLY === 'true' || process.env.USE_REDIS !== 'true';

const ttl = process.env.REDIS_CACHE_TTL_MEDIA ?? 30 * 60;

const getCleanReqHeaders = (headers: NextApiRequest['headers']) => {
  const cleanHeaders: AxiosRequestHeaders = {};

  if (headers.accept) cleanHeaders.accept = headers.accept;
  if (headers.range) cleanHeaders.range = headers.range;
  if (headers['accept-encoding'])
    cleanHeaders['accept-encoding'] = headers['accept-encoding'].toString();

  return cleanHeaders;
};

const resHeadersArr = ['content-range', 'content-length', 'content-type', 'accept-ranges'];

// checks if a url is pointing towards a video/image from imdb
const regex =
  /^https:\/\/((m\.)?media-amazon\.com|imdb-video\.media-imdb\.com).*\.(jpg|jpeg|png|mp4|gif|webp).*$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mediaUrl = req.query.url as string | undefined;
    const requestHeaders = getCleanReqHeaders(req.headers);

    // 1. returning if query is illegal
    if (!mediaUrl || !regex.test(mediaUrl))
      return res.status(400).json({
        success: false,
        message: 'Invalid query',
      });

    // 2. sending streamed response if redis, or redis for media isn't enabled
    if (dontCacheMedia) {
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
    const cachedMedia = await redis.getBuffer(mediaKey(mediaUrl));

    if (cachedMedia) {
      res.setHeader('x-cached', 'true');
      res.status(304).send(cachedMedia);
      return;
    }

    // 4. else getting, caching and sending response
    const { data } = await axiosInstance(mediaUrl, {
      responseType: 'arraybuffer',
    });

    // saving in redis for 30 minutes
    await redis.setex(mediaKey(mediaUrl), ttl, Buffer.from(data));

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
