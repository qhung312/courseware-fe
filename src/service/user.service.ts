import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

const getUserProfile = () => axios.get(`${API_URL}me`);

const UserService = { getUserProfile };

export default UserService;
