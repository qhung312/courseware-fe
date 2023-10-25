import { API_URL } from '../config';
import { QuestionTemplate } from '../types';
import { Response } from '../types/response';
import { axios } from '../utils/custom-axios';

type GetAllQuestionTemplatesArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
};
type GetAllQuestionTemplatesReturnType = {
  total: number;
  result: QuestionTemplate[];
};
const getAll = (query: GetAllQuestionTemplatesArgument) => {
  const queryString = `${API_URL}question_template?pagination=false\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}\
${query.chapter ? `&chapter=${encodeURIComponent(query.chapter)}` : ''}`;

  return axios.get<Response<GetAllQuestionTemplatesReturnType>>(queryString);
};

type GetAllQuestionTemplatesPaginatedArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllQuestionTemplatesPaginatedReturnType = {
  total: number;
  pageCount: number;
  pageSize: number;
  result: QuestionTemplate[];
};
const getAllPaginated = (query: GetAllQuestionTemplatesPaginatedArgument) => {
  const queryString = `${API_URL}question_template?pagination=true\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.subject ? `&subject=${encodeURIComponent(query.subject)}` : ''}\
${query.chapter ? `&chapter=${encodeURIComponent(query.chapter)}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllQuestionTemplatesPaginatedReturnType>>(queryString);
};

const QuestionTemplateService = { getAll, getAllPaginated };

export default QuestionTemplateService;
