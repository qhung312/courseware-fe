import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { ExamArchive } from '../types/examArchive';
import type { Response } from '../types/response';

type GetAllExamArchiveArgument = {
  name?: string;
  subject?: string;
  semester?: string;
  type?: string;
};
type GetAllExamArchiveReturnType = {
  total: number;
  result: ExamArchive[];
};
const getAll = (query: GetAllExamArchiveArgument) => {
  const queryString = `${API_URL}previous-exam?pagination=false\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.semester ? `&semester=${query.semester}` : ''}\
${query.type ? `&type=${query.type}` : ''}`;

  return axios.get<Response<GetAllExamArchiveReturnType>>(queryString);
};

type GetAllExamArchivePaginatedArgument = {
  name?: string;
  subject?: string;
  semester?: string;
  type?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllExamArchivePaginatedReturnType = {
  total: number;
  pageCount: number;
  pageSize: number;
  result: ExamArchive[];
};
const getAllPaginated = (query: GetAllExamArchivePaginatedArgument) => {
  const queryString = `${API_URL}previous-exam?pagination=true\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.semester ? `&semester=${query.semester}` : ''}\
${query.type ? `&type=${query.type}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllExamArchivePaginatedReturnType>>(queryString);
};

const create = () => axios.post<Response<ExamArchive>>(`${API_URL}previous-exam/`);

const edit = (examId: string) =>
  axios.patch<Response<ExamArchive>>(`${API_URL}previous-exam/${examId}`);

const deleteById = (examId: string) =>
  axios.delete<Response<ExamArchive>>(`${API_URL}previous-exam/${examId}`);

const download = (examId: string) =>
  axios.get<Response<ExamArchive>>(`${API_URL}previous-exam/download/${examId}`);

const getById = (examId: string) =>
  axios.get<Response<ExamArchive>>(`${API_URL}previous-exam/${examId}`);

const ExamArchiveService = {
  getAll,
  getAllPaginated,
  create,
  edit,
  deleteById,
  download,
  getById,
};

export default ExamArchiveService;
