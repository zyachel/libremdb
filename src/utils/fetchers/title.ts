import * as cheerio from 'cheerio';
import RawTitle from 'src/interfaces/misc/rawTitle';
import axiosInstance from 'src/utils/axiosInstance';
import cleanTitle from 'src/utils/cleaners/title';
import { AppError } from 'src/utils/helpers';

const title = async (titleId: string) => {
  try {
    // getting data
    const res = await axiosInstance(`/title/${titleId}`);
    const $ = cheerio.load(res.data);
    const rawData = $('script#__NEXT_DATA__').text();
    // cleaning it a bit
    const parsedRawData: RawTitle = JSON.parse(rawData);
    const cleanData = cleanTitle(parsedRawData);
    // returning
    return cleanData;
  } catch (err: any) {
    if (err.response?.status === 404)
      throw new AppError('not found', 404, err.cause);

    throw new AppError('something went wrong', 500, err.cause);
  }
};

export default title;
