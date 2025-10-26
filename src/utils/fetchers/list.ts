import * as cheerio from 'cheerio';
import cleanList from 'src/utils/cleaners/list';
import RawList from 'src/interfaces/misc/rawList';
import axiosInstance, { isSaneError } from 'src/utils/axiosInstance';
import { AppError } from 'src/utils/helpers';

const list = async (listId: string, pageNum = '1') => {
  try {
    const res = await axiosInstance(`/list/${listId}?page=${pageNum}`);
    const $ = cheerio.load(res.data);
    const rawData = $('script#__NEXT_DATA__').text();

    if (!rawData) {
      throw new AppError('Could not find list data', 404);
    }

    const parsedList: RawList = JSON.parse(rawData);
    const cleanData = cleanList(parsedList);
    return cleanData;
  } catch (err) {
     if (isSaneError(err) && err.response?.status === 404)
       throw new AppError('not found', 404, err);

    throw new AppError('something went wrong', 500, err);
  }
};

export default list;
