import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import redis from '../../utils/redis'
import crypto from 'crypto'

const acceptableExtensions = ['.jpg', '.png', '.gif', '.webp']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get query param
  const mediaUrl = (req.query as { url: string }).url

  if (!mediaUrl) {
    res.status(400)
    res.send(null)
    return
  }

  let mediaUrlParsed: URL

  try {
    mediaUrlParsed = new URL(mediaUrl)
  } catch {
    res.status(400)
    res.send(null)
    return
  }

  // get media domain
  const mediaDomain = mediaUrlParsed.hostname

  if (!mediaDomain.endsWith('media-amazon.com')) {
    res.status(400)
    res.send(null)
    return
  }

  if (mediaUrlParsed.protocol !== 'https:') {
    res.status(400)
    res.send(null)
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
    res.send(null)
    return
  }

  // hash mediaUrl with blake3
  const mediaUrlHash = await crypto
    .createHash('sha256')
    .update(mediaUrl)
    .digest('base64')

  // try to find mediaUrlHash in redis
  const cacheKey = `media_proxy:${mediaUrlHash}`

  const cachedMedia = await redis.get(cacheKey)

  if (cachedMedia) {
    res.send(cachedMedia)
    return
  }

  // download media
  const mediaRes = await fetch(mediaUrl)

  if (!mediaRes.ok) {
    res.status(mediaRes.status)
    return
  }

  const mediaBuffer = Buffer.from(await mediaRes.arrayBuffer())

  // save in redis for 30 minutes
  await redis.setex(cacheKey, 60 * 30, mediaBuffer)

  // send media
  res.send(mediaBuffer)
}
