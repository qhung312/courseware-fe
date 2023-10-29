import { API_URL } from '../config';
import { Chapter } from '../types';
import { Response } from '../types/response';
import { axios } from '../utils/custom-axios';

type GetAllChapterArgument = {
  name?: string;
  subject?: string;
};
type GetAllChapterResponse = {
  total: number;
  result: Chapter[];
};
const getAll = (query: GetAllChapterArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}chapter?pagination=false\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}`;

  return axios.get<Response<GetAllChapterResponse>>(queryString);
};

type GetAllChapterPaginatedArgument = {
  name?: string;
  subject?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllChapterPaginatedResponse = {
  total: number;
  pageCount: number;
  result: Chapter[];
};
const getAllPaginated = (query: GetAllChapterPaginatedArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}chapter?pagination=true\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllChapterPaginatedResponse>>(queryString);
};

const getById = (id: string, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}chapter/${id}`;

  return axios.get<Response<Chapter>>(queryString);
};

const ChapterService = { getAll, getAllPaginated, getById };

export default ChapterService;
