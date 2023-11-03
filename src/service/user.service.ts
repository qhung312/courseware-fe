import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Response } from '../types/response';
import type { User } from '../types/user';

export type ActivityReturnType = {
  _id: string;
  type: string;
  userId: string;
  materialId: {
    _id: string;
    name: string;
    subject: {
      _id: string;
      name: string;
    };
  };
  previousExamId: {
    _id: string;
    name: string;
    subject: {
      _id: string;
      name: string;
    };
    semester: string;
    type: string;
  };
  createdAt: number;
};

type GetAllActivityReturnType = {
  total: number;
  results: ActivityReturnType[];
};

const getUserProfile = () => axios.get<Response<User>>(`${API_URL}me`);

const editUserProfile = (profile: User) => {
  const queryString = `${API_URL}me`;
  console.log(profile);

  return axios.patch<Response<User>>(queryString, profile);
};

const getUserActivity = (activityType: string) => {
  const queryString = `${API_URL}me/activity?pagination=false\
${activityType ? `&type=${activityType}` : ''}`;
  console.log(queryString);
  return axios.get<Response<GetAllActivityReturnType>>(queryString);
};

const UserService = { getUserProfile, editUserProfile, getUserActivity };

export default UserService;
