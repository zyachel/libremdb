import * as cheerio from 'cheerio';
import RawName from 'src/interfaces/misc/rawName';
import axiosInstance from 'src/utils/axiosInstance';
import cleanName from 'src/utils/cleaners/name';
import { AppError } from 'src/utils/helpers';

const name = async (nameId: string) => {
  try {
    // getting data
    const res = await axiosInstance(`/name/${nameId}`);
    const $ = cheerio.load(res.data);
    const rawData = $('script#__NEXT_DATA__').text();
    // cleaning it a bit
    const parsedRawData: RawName = JSON.parse(rawData);
    const cleanData = cleanName(parsedRawData);
    // returning
    return cleanData;
  } catch (err: any) {
    if (err.response?.status === 404) throw new AppError('not found', 404, err.cause);

    throw new AppError('something went wrong', 500, err.cause);
  }
};

export default name;
