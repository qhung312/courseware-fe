import { API_URL } from '../config';
import { Chapter } from '../types';
import { Response } from '../types/response';
import { axios } from '../utils/custom-axios';

type GetAllChaptersArgument = {
  name?: string;
  subject?: string;
};
type GetAllChaptersReturnType = {
  total: number;
  result: Chapter[];
};
const getAll = (query: GetAllChaptersArgument) => {
  const queryString = `${API_URL}chapter?pagination=false\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}`;

  return axios.get<Response<GetAllChaptersReturnType>>(queryString);
};

type GetAllChaptersPaginatedArgument = {
  name?: string;
  subject?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllChaptersPaginatedReturnType = {
  total: number;
  pageCount: number;
  pageSize: number;
  result: Chapter[];
};
const getAllPaginated = (query: GetAllChaptersPaginatedArgument) => {
  const queryString = `${API_URL}chapter?pagination=true\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllChaptersPaginatedReturnType>>(queryString);
};

const ChapterService = { getAll, getAllPaginated };

export default ChapterService;
