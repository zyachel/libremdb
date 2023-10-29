import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = { status: false; message: string };

export default async function handler(_: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(400).json({ status: false, message: 'Not found' });
}
