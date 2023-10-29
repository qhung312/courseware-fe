import { API_URL } from '../config';
import { Question, Response } from '../types';
import { axios } from '../utils/custom-axios';

type GetAllQuestionArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
};
type GetAllQuestionResponse = {
  total: number;
  result: Question[];
};
const getAll = (query: GetAllQuestionArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}question?pagination=false\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}\
${query.chapter ? `&chapter=${encodeURIComponent(query.chapter)}` : ''}`;

  return axios.get<Response<GetAllQuestionResponse>>(queryString);
};

type GetAllQuestionPaginatedArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllQuestionPaginatedResponse = {
  total: number;
  pageCount: number;
  result: Question[];
};
const getAllPaginated = (query: GetAllQuestionPaginatedArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}question?pagination=true\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}\
${query.chapter ? `&chapter=${encodeURIComponent(query.chapter)}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllQuestionPaginatedResponse>>(queryString);
};

const getById = (questionId: string, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}question/${questionId}`;

  return axios.get<Response<Question>>(queryString);
};

const QuestionTemplateService = { getAll, getAllPaginated, getById };

export default QuestionTemplateService;
