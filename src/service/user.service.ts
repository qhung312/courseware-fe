import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Response } from '../types/response';
import type { User } from '../types/user';

const getUserProfile = () => axios.get<Response<User>>(`${API_URL}/me`);

const UserService = { getUserProfile };

export default UserService;
