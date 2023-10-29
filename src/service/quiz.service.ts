import { API_URL } from '../config';
import { Quiz, Response } from '../types';
import { axios } from '../utils/custom-axios';

type GetAllQuizArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
};
type GetAllQuizResponse = {
  total: number;
  result: Quiz[];
};
const getAll = (query: GetAllQuizArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}quiz?pagination=false\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.chapter ? `&chapter=${query.chapter}` : ''}`;

  return axios.get<Response<GetAllQuizResponse>>(queryString);
};

type GetAllQuizPaginatedArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllQuizPaginatedArgumentResponse = {
  total: number;
  pageCount: number;
  result: Quiz[];
};
const getAllPaginated = (query: GetAllQuizPaginatedArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}quiz?pagination=true\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.chapter ? `&chapter=${query.chapter}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllQuizPaginatedArgumentResponse>>(queryString);
};

const getById = (id: string, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}quiz/${id}`;

  return axios.get<Response<Quiz>>(queryString);
};

const QuizService = { getAll, getAllPaginated, getById };
export default QuizService;
