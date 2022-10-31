import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import redis from '../../utils/redis'
import crypto from 'crypto'

const acceptableExtensions = ['.jpg', '.png', '.gif', '.webp', '.mp4']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userIp =
    (req.headers['cf-connecting-ip'] as string) ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    null

  if (!userIp) {
    res.status(500)
    res.json({
      success: false,
      message: 'Unable to enforce ratelimit',
    })
    return
  }

  // hash ip with md5 (for speed)
  const ipHash = crypto.createHash('md5').update(userIp).digest('hex')

  const key = `ip_ratelimit:${ipHash}`

  // check if ip is in redis
  let ipInRedis = await redis.get(key)

  if (!ipInRedis) {
    // if not, set it to 1
    await redis.setex(key, 30, '1')
    ipInRedis = '1'
  }

  const ipReqNumber = Number(ipInRedis)

  if (ipReqNumber > 60) {
    res.status(429)
    res.setHeader('x-cringe', 'stop abusing a FOSS service')
    res.json({
      success: false,
      message: 'Too many requests',
    })
    return
  }

  // increment ip in redis
  await redis.set(key, String(ipReqNumber + 1))

  // get query param
  const mediaUrl = (req.query as { url: string }).url

  if (!mediaUrl) {
    res.status(400)
    res.json({
      success: false,
      message: 'Missing query',
    })
    return
  }

  let mediaUrlParsed: URL

  try {
    mediaUrlParsed = new URL(mediaUrl)
  } catch {
    res.status(400)
    res.json({
      success: false,
      message: 'Invalid URL',
    })
    return
  }

  // get media domain
  const mediaDomain = mediaUrlParsed.hostname

  if (
    !mediaDomain.endsWith('media-amazon.com') &&
    mediaDomain !== 'imdb-video.media-imdb.com'
  ) {
    res.status(400)
    res.json({
      success: false,
      message: 'Unauthorized domain',
    })
    return
  }

  if (mediaUrlParsed.protocol !== 'https:') {
    res.status(400)
    res.json({
      success: false,
      message: 'Unauthorized protocol',
    })
    return
  }

  let validExtension = false

  for (const acceptableExtension of acceptableExtensions) {
    if (mediaUrlParsed.pathname.endsWith(acceptableExtension)) {
      validExtension = true
      break
    }
  }

  if (!validExtension) {
    res.status(400)
    res.json({
      success: false,
      message: 'Unauthorized extension',
    })
    return
  }

  // hash mediaUrl with blake3
  const mediaUrlHash = crypto
    .createHash('sha256')
    .update(mediaUrl)
    .digest('base64')

  // try to find mediaUrlHash in redis
  const cacheKey = `media_proxy:${mediaUrlHash}`

  const cachedMedia = await redis.get(cacheKey)

  if (cachedMedia) {
    res.status(302)
    res.setHeader('x-cached', 'true')
    res.send(cachedMedia)
    return
  }

  res.setHeader('x-cached', 'false')

  // download media
  const mediaRes = await fetch(mediaUrl)

  if (!mediaRes.ok) {
    res.status(mediaRes.status)
    res.json({
      success: false,
      message: 'Error from Amazon',
    })
    return
  }

  const mediaBuffer = Buffer.from(await mediaRes.arrayBuffer())

  // save in redis for 30 minutes
  await redis.setex(cacheKey, 60 * 30, mediaBuffer)

  // send media
  res.send(mediaBuffer)
}

export const config = {
  api: {
    responseLimit: false,
  },
}
