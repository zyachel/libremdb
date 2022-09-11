// external deps
import * as cheerio from 'cheerio';
// local files
import axiosInstance from '../axiosInstance';
import cleanTitle from '../cleaners/title';
import { AppError } from '../helpers';
// interfaces
import RawTitle from '../../interfaces/misc/rawTitle';

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
