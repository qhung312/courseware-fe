import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

export const downloadDocument = () =>
  axios.get(`${API_URL}previous-exams/download/64437c81976358fb47c55591`);
