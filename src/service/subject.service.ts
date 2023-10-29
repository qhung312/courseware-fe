import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Response } from '../types/response';
import type { Subject } from '../types/subject';

type GetAllSubjectPaginatedArgument = {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllSubjectPaginatedReturnType = {
  total: number;
  pageCount: number;
  pageSize: number;
  result: Subject[];
};
const getAllPaginated = (query: GetAllSubjectPaginatedArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}subject?pagination=true\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllSubjectPaginatedReturnType>>(queryString);
};

type GetAllSubjectArgument = {
  name?: string;
};
type GetAllSubjectReturnType = {
  total: number;
  result: Subject[];
};
const getAll = (query: GetAllSubjectArgument, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}subject?pagination=false\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}`;
  return axios.get<Response<GetAllSubjectReturnType>>(queryString);
};

const getById = (subjectId: string, admin = false) => {
  const queryString = `${API_URL}${admin ? 'admin/' : ''}subject/${subjectId}`;

  return axios.get<Response<Subject>>(queryString);
};

const SubjectService = { getAll, getAllPaginated, getById };

export default SubjectService;
