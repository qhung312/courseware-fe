import { API_URL } from '../config';
import { QuizTemplate } from '../types';
import { Response } from '../types/response';
import { axios } from '../utils/custom-axios';

type GetAllQuizTemplateArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
};
type GetAllQuizTemplateReturnType = {
  total: number;
  quizTemplates: QuizTemplate[];
};
const getAll = (query: GetAllQuizTemplateArgument) => {
  const queryString = `${API_URL}quiz_template?pagination=false\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.chapter ? `&chapter=${query.chapter}` : ''}`;

  return axios.get<Response<GetAllQuizTemplateReturnType>>(queryString);
};

type GetAllQuizTemplatePaginatedArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllQuizTemplatePaginatedReturnType = {
  total: number;
  pageCount: number;
  pageSize: number;
  result: QuizTemplate[];
};
const getAllPaginated = (query: GetAllQuizTemplatePaginatedArgument) => {
  const queryString = `${API_URL}quiz_template?pagination=true\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.chapter ? `&chapter=${query.chapter}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllQuizTemplatePaginatedReturnType>>(queryString);
};

const QuizTemplateService = { getAll, getAllPaginated };
export default QuizTemplateService;
