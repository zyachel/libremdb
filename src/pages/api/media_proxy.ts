import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import redis from '../../utils/redis'
import crypto from 'crypto'

const acceptableExtensions = ['.jpg', '.png', '.gif', '.webp', '.mp4']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    res.send(cachedMedia)
    return
  }

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
