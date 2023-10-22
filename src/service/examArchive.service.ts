import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { ExamArchive } from '../types/examArchive';
import type { Response } from '../types/response';

const getAll = () => axios.get<Response<ExamArchive[]>>(`${API_URL}previous-exams/`);

const create = () => axios.post<Response<ExamArchive>>(`${API_URL}previous-exams/`);

const edit = (examId: string) =>
  axios.patch<Response<ExamArchive>>(`${API_URL}previous-exams/${examId}`);

const deleteById = (examId: string) =>
  axios.delete<Response<ExamArchive>>(`${API_URL}previous-exams/${examId}`);

const download = (examId: string) =>
  axios.get<Response<ExamArchive>>(`${API_URL}previous-exams/download/${examId}`);

const getById = (examId: string) =>
  axios.get<Response<ExamArchive>>(`${API_URL}previous-exams/${examId}`);

const getAllBySubject = (subjectId: string) =>
  axios.get<Response<ExamArchive[]>>(`${API_URL}previous-exams/subject/${subjectId}`);

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
