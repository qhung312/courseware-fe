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
const getAllPaginated = (query: GetAllSubjectPaginatedArgument) => {
  const queryString = `${API_URL}subject?pagination=true\
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
const getAll = (query: GetAllSubjectArgument) => {
  const queryString = `${API_URL}subject?pagination=false\
${query.name ? `&name=${encodeURIComponent(query.name)}` : ''}`;
  return axios.get<Response<GetAllSubjectReturnType>>(queryString);
};

type CreateSubjectArgument = {
  name: string;
  description: string;
};
const create = (arg: CreateSubjectArgument) =>
  axios.post<Response<Subject>>(`${API_URL}subject`, arg);

type EditSubjectArgument = {
  name?: string;
  description?: string;
};
const edit = (subjectId: string, update: EditSubjectArgument) =>
  axios.patch<Response<Subject>>(`${API_URL}subject/${subjectId}`, update);

const deleteById = (subjectId: string) =>
  axios.delete<Response<Subject>>(`${API_URL}subject/${subjectId}`);

const SubjectService = { create, edit, getAll, getAllPaginated, deleteById };

export default SubjectService;
