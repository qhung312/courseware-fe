import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Material } from '../types/material';
import type { Response } from '../types/response';

const getAll = () => axios.get<Response<Material[]>>(`${API_URL}/material`);

const create = () => axios.post<Response<Material>>(`${API_URL}/material`);

const edit = (materialId: string) =>
  axios.patch<Response<Material>>(`${API_URL}/material/${materialId}`);

const deleteById = (materialId: string) =>
  axios.delete<Response<Material>>(`${API_URL}/material/${materialId}`);

const download = (materialId: string) =>
  axios.get<Response<Material>>(`${API_URL}/material/download/${materialId}`);

const getById = (materialId: string) =>
  axios.get<Response<Material>>(`${API_URL}/material/${materialId}`);

const getAllBySubject = (subjectId: string) =>
  axios.get<Response<Material[]>>(`${API_URL}/material/subject/${subjectId}`);

const MaterialService = {
  getAll,
  create,
  getAllBySubject,
  edit,
  deleteById,
  download,
  getById,
};
export default MaterialService;
