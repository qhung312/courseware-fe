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
const getAll = (query: GetAllExamArchiveArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}/previous_exam?pagination=false\
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
const getAllPaginated = (query: GetAllExamArchivePaginatedArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}previous_exam?pagination=true\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.semester ? `&semester=${query.semester}` : ''}\
${query.type ? `&type=${query.type}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllExamArchivePaginatedReturnType>>(queryString);
};

const download = (examId: string, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}previous_exam/${examId}/download`;

  return axios.get<Response<ExamArchive>>(queryString);
};

const getById = (examId: string, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}previous_exam/${examId}`;

  return axios.get<Response<ExamArchive>>(queryString);
};

const create = (data: FormData) => {
  return axios.post<Response<ExamArchive>>(`${API_URL}admin/previous_exam`, data);
};

const deleteById = (examId: string) => {
  return axios.delete<Response<ExamArchive>>(`${API_URL}admin/previous_exam/${examId}`);
};

const ExamArchiveService = {
  getAll,
  getAllPaginated,
  download,
  getById,
  create,
  deleteById,
};

export default ExamArchiveService;
