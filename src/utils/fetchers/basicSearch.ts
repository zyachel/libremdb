import * as cheerio from 'cheerio';
import RawFind from 'src/interfaces/misc/rawFind';
import axiosInstance from 'src/utils/axiosInstance';
import { AppError } from 'src/utils/helpers';
import cleanFind from 'src/utils/cleaners/find';

const basicSearch = async (queryStr: string) => {
  try {
    const res = await axiosInstance(`/find?${queryStr}`);
    const $ = cheerio.load(res.data);
    const rawData = $('script#__NEXT_DATA__').text();

    const parsedRawData: RawFind = JSON.parse(rawData);
    const cleanData = cleanFind(parsedRawData);

    return cleanData;
  } catch (err: any) {
    if (err.response?.status === 404)
      throw new AppError('not found', 404, err.cause);

    throw new AppError('something went wrong', 500, err.cause);
  }
};

export default basicSearch;
