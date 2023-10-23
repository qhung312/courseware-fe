import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { ExamArchive } from '../types/examArchive';
import type { Response } from '../types/response';

const getAll = () => axios.get<Response<ExamArchive[]>>(`${API_URL}previous-exam/`);

const create = () => axios.post<Response<ExamArchive>>(`${API_URL}previous-exam/`);

const edit = (examId: string) =>
  axios.patch<Response<ExamArchive>>(`${API_URL}previous-exam/${examId}`);

const deleteById = (examId: string) =>
  axios.delete<Response<ExamArchive>>(`${API_URL}previous-exam/${examId}`);

const download = (examId: string) =>
  axios.get<Response<ExamArchive>>(`${API_URL}previous-exam/download/${examId}`);

const getById = (examId: string) =>
  axios.get<Response<ExamArchive>>(`${API_URL}previous-exam/${examId}`);

const getAllBySubject = (subjectId: string) =>
  axios.get<Response<ExamArchive[]>>(`${API_URL}previous-exam/subject/${subjectId}`);

const ExamArchiveService = {
  getAll,
  create,
  edit,
  deleteById,
  download,
  getById,
  getAllBySubject,
};

export default ExamArchiveService;
