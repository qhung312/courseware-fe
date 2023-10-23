import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';
import { generateQuery } from '../utils/helper';

import type { ExamArchive } from '../types/examArchive';
import type { GetPaginationOptions } from '../types/request';
import type { Response } from '../types/response';

interface GetRequestProps extends GetPaginationOptions {
  name?: string;
  subjectId?: string;
  chapterId?: string;
}

const getAll = ({ page, pageSize, name, subjectId, chapterId }: GetRequestProps = {}) => {
  const queryUrl = generateQuery({ page, pageSize, name, subjectId, chapterId });
  return page || pageSize
    ? axios.get<Response<ExamArchive[], true>>(`${API_URL}previous-exam${queryUrl}`)
    : axios.get<Response<ExamArchive[]>>(`${API_URL}previous-exam${queryUrl}`);
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
  create,
  edit,
  deleteById,
  download,
  getById,
};

export default ExamArchiveService;
