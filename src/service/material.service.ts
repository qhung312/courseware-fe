import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Material } from '../types/material';
import type { Response } from '../types/response';

type GetAllMaterialArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
};
type GetAllMaterialReturnType = {
  total: number;
  result: Material[];
};
const getAll = (query: GetAllMaterialArgument) => {
  const queryString = `${API_URL}material?pagination=false\
${query.name ? `&name=${query.name}` : ''}
${query.subject ? `&subject=${query.subject}` : ''}
${query.chapter ? `&chapter=${query.chapter}` : ''}`;

  return axios.get<Response<GetAllMaterialReturnType>>(queryString);
};

type GetAllMaterialPaginatedArgument = {
  name?: string;
  subject?: string;
  chapter?: string;
  pageNumber?: number;
  pageSize?: number;
};
type GetAllMaterialPaginatedReturnType = {
  total: number;
  pageSize: number;
  pageCount: number;
  result: Material[];
};
const getAllPaginated = (query: GetAllMaterialPaginatedArgument) => {
  const queryString = `${API_URL}material?pagination=true\
${query.name ? `&name=${query.name}` : ''}\
${query.subject ? `&subject=${query.subject}` : ''}\
${query.chapter ? `&chapter=${query.chapter}` : ''}\
${query.pageNumber !== undefined ? `&pageNumber=${query.pageNumber}` : ''}\
${query.pageSize !== undefined ? `&pageSize=${query.pageSize}` : ''}`;

  return axios.get<Response<GetAllMaterialPaginatedReturnType>>(queryString);
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
  getAllPaginated,
  create,
  edit,
  deleteById,
  download,
  getById,
};
export default MaterialService;
