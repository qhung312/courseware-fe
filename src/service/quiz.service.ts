import { API_URL } from '../config';
import { Quiz, Response } from '../types';
import { axios } from '../utils/custom-axios';

type GetAllQuizsProps = {
  name?: string;
  subject?: string;
  chapter?: string;
};

const getAll = (query: GetAllQuizsProps) => {
  const queryString = `${API_URL}quiz_template?pagination=false\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.chapter ? `&chapter=${query.chapter}` : ''}`;

  return axios.get<Response<Quiz[], false>>(queryString);
};

type GetPaginatedQuizsProps = {
  name?: string;
  subject?: string;
  chapter?: string;
  pageNumber?: number;
  pageSize?: number;
};

const getAllPaginated = (query: GetPaginatedQuizsProps) => {
  const queryString = `${API_URL}quiz_template?pagination=true\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.chapter ? `&chapter=${query.chapter}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<Quiz[], true>>(queryString);
};

const QuizTemplateService = { getAll, getAllPaginated };
export default QuizTemplateService;
