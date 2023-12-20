import { API_URL } from '../config';
import { MockTest } from '../types/mockTest';
import { axios } from '../utils/custom-axios';

import type { ExamArchive } from '../types/examArchive';
import type { Response } from '../types/response';

type CreateMockTestArgument = {
  name: string;
  description: string;
  registrationStartedAt: number;
  registrationEndedAt: number;
  subject: string;
  semester: string;
  type: string;
  slots?: never[];
};

type GetAllExamArchiveArgument = {
  name?: string;
  subject?: string;
  semester?: string;
  chapter?: string;
  type?: string;
};
// type EditArgument = {
//   name?: string;
//   subject?: string;
//   semester?: string;
//   type?: string;
//   description?: string;
//   isHidden?: boolean;
// };
type GetAllExamArchiveReturnType = {
  total: number;
  result: ExamArchive[];
};
const getAll = (query: GetAllExamArchiveArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}previous_exam?pagination=false\
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

const getById = (examId: string, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}previous_exam/${examId}`;

  return axios.get<Response<ExamArchive>>(queryString);
};

const create = (data: CreateMockTestArgument) => {
  return axios.post<Response<MockTest>>(`${API_URL}admin/exam`, data);
};

// const deleteById = (examId: string) => {
//   return axios.delete<Response<ExamArchive>>(`${API_URL}admin/previous_exam/${examId}`);
// };

// const edit = (examId: string, data: EditArgument, admin = false) => {
//   const queryString = `${API_URL}${admin ? 'admin/' : ''}previous_exam/${examId}`;

//   return axios.patch<Response<ExamArchive>>(queryString, data);
// };

const MocTestService = {
  getAll,
  getAllPaginated,
  getById,
  create,
  // deleteById,
  // edit,
};

export default MocTestService;
