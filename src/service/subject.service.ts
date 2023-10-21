import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Response } from '../types/response';
import type { Subject } from '../types/subject';

const getAll = () => axios.get<Response<Subject[]>>(`${API_URL}/subject`);

const create = () => axios.post<Response<Subject>>(`${API_URL}/subject`);

const edit = (subjectId: string) =>
  axios.patch<Response<Subject>>(`${API_URL}/subject/${subjectId}`);

const deleteById = (subjectId: string) =>
  axios.delete<Response<Subject>>(`${API_URL}/subject/${subjectId}`);

const SubjectService = { create, edit, getAll, deleteById };

export default SubjectService;
