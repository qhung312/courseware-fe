import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';
import { generateQuery } from '../utils/helper';

import type { Material } from '../types/material';
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
    ? axios.get<Response<Material[], true>>(`${API_URL}material${queryUrl}`)
    : axios.get<Response<Material[]>>(`${API_URL}material${queryUrl}`);
};
const create = () => axios.post<Response<Material>>(`${API_URL}material`);

const edit = (materialId: string) =>
  axios.patch<Response<Material>>(`${API_URL}material/${materialId}`);

const deleteById = (materialId: string) =>
  axios.delete<Response<Material>>(`${API_URL}material/${materialId}`);

const download = (materialId: string) =>
  axios.get<Response<Material>>(`${API_URL}material/download/${materialId}`);

const getById = (materialId: string) =>
  axios.get<Response<Material>>(`${API_URL}material/${materialId}`);

const MaterialService = {
  getAll,
  create,
  edit,
  deleteById,
  download,
  getById,
};
export default MaterialService;
