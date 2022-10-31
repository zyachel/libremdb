import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

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

  // download media
  const mediaRes = await fetch(mediaUrl)

  if (!mediaRes.ok) {
    res.status(mediaRes.status)
    return
  }

  // get media type
  const mediaType = mediaRes.headers.get('content-type')

  if (!mediaType) {
    res.status(500)
    res.send(null)
    return
  }

  // set media type
  res.setHeader('content-type', mediaType)

  const mediaBuffer = await mediaRes.arrayBuffer()

  // send media
  res.send(Buffer.from(mediaBuffer))
}
