import { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../utils/redis'
import axiosInstance from '../../utils/axiosInstance'
import { AxiosResponse } from 'axios'

const regex =
  /^https:\/\/((m\.)?media-amazon\.com|imdb-video\.media-imdb\.com).*\.(jpg|jpeg|png|mp4|gif|webp).*$/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mediaUrl = req.query.url as string | undefined

  if (!mediaUrl || !regex.test(mediaUrl))
    return res.status(400).json({
      success: false,
      message: 'Invalid query',
    })

  const cachedMedia = await redis.getBuffer(mediaUrl)

  if (cachedMedia) {
    res.setHeader('x-cached', 'true')
    res.status(302).send(cachedMedia)
    return
  }

  let mediaRes: AxiosResponse
  try {
    mediaRes = await axiosInstance(mediaUrl, { responseType: 'arraybuffer' })
  } catch {
    res.status(404)
    res.json({
      success: false,
      message: 'Error from IMDb',
    })
    return
  }

  const data = mediaRes.data
  // save in redis for 30 minutes
  await redis.setex(mediaUrl, 30 * 60, Buffer.from(data))

  // send media
  res.setHeader('x-cached', 'false')
  res.send(data)
}

export const config = {
  api: {
    responseLimit: false,
  },
}
