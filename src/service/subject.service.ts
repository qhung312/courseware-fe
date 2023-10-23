import { API_URL } from '../config';
import { GetPaginationOptions } from '../types/request';
import { axios } from '../utils/custom-axios';
import { generateQuery } from '../utils/helper';

import type { Response } from '../types/response';
import type { Subject } from '../types/subject';

const getAll = ({ page, pageSize }: GetPaginationOptions = {}) => {
  const queryUrl = generateQuery({ page, pageSize });
  return page || pageSize
    ? axios.get<Response<Subject[], true>>(`${API_URL}subject${queryUrl}`)
    : axios.get<Response<Subject[]>>(`${API_URL}subject${queryUrl}`);
};
const create = () => axios.post<Response<Subject>>(`${API_URL}subject`);

const edit = (subjectId: string) =>
  axios.patch<Response<Subject>>(`${API_URL}subject/${subjectId}`);

const deleteById = (subjectId: string) =>
  axios.delete<Response<Subject>>(`${API_URL}subject/${subjectId}`);

const SubjectService = { create, edit, getAll, deleteById };

export default SubjectService;
