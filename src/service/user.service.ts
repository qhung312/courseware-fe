import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Response } from '../types/response';
import type { User } from '../types/user';

const getUserProfile = () => axios.get<Response<User>>(`${API_URL}me`);

const editUserProfile = (profile: User) => {
  const queryString = `${API_URL}me`;
  console.log(profile);

  return axios.patch<Response<User>>(queryString, profile);
};

const UserService = { getUserProfile, editUserProfile };

export default UserService;
