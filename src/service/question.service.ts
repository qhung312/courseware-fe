import { API_URL } from '../config';
import { Question, Response } from '../types';
import { axios } from '../utils/custom-axios';

type GetAllQuestionsProps = {
  name?: string;
  subject?: string;
  chapter?: string;
};

const getAll = (query: GetAllQuestionsProps) => {
  const queryString = `${API_URL}question_template?pagination=false\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}\
${query.chapter ? `&chapter=${encodeURIComponent(query.chapter)}` : ''}`;

  return axios.get<Response<Question[], false>>(queryString);
};

type GetPaginatedQuestionsProps = {
  name?: string;
  subject?: string;
  chapter?: string;
  pageNumber?: number;
  pageSize?: number;
};

const getAllPaginated = (query: GetPaginatedQuestionsProps) => {
  const queryString = `${API_URL}question_template?pagination=true\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}\
${query.chapter ? `&chapter=${encodeURIComponent(query.chapter)}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<Question[], true>>(queryString);
};

const QuestionTemplateService = { getAll, getAllPaginated };

export default QuestionTemplateService;
