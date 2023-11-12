import { API_URL } from '../config';
import { axios } from '../utils/custom-axios';

import type { Response } from '../types/response';
import type { User } from '../types/user';

export type GetActivityProp = {
  activityType: string;
  pageSize?: number;
  pageNumber?: number;
};

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
  quizSessionId: {
    _id: string;
    status: string;
    fromQuiz: {
      _id: string;
      name: string;
      subject: {
        _id: string;
        name: string;
      };
      chapter: {
        _id: string;
        name: string;
      };
    };
  };
  createdAt: number;
};

type GetAllActivityReturnType = {
  total: number;
  results: ActivityReturnType[];
  count: {
    VIEW_MATERIAL: number;
    VIEW_PREVIOUS_EXAM: number;
    START_QUIZ_SESSION: number;
  };
};

export type GetAllSubjectStatisticReturnType = {
  _id: string;
  name: string;
  total: number;
  score: number;
};

interface StatisticsResponse {
  success: boolean;
  code: number;
  message: string;
  payload: GetAllSubjectStatisticReturnType[];
}

const getUserProfile = () => axios.get<Response<User>>(`${API_URL}me`);

const editUserProfile = (profile: User) => {
  const queryString = `${API_URL}me`;

  return axios.patch<Response<User>>(queryString, profile);
};

const getUserActivity = (query: GetActivityProp) => {
  const queryString = `${API_URL}me/activity?type=${query.activityType}\
${query.pageSize ? `&pageSize=${query.pageSize}` : ''}\
${query.pageNumber ? `&pageSize=${query.pageNumber}` : ''}`;
  return axios.get<Response<GetAllActivityReturnType>>(queryString);
};

const deleteUserActivity = (activityId: string) =>
  axios.delete(`${API_URL}me/activity/${activityId}`);

const getAllSubjectStatistic = () => axios.get<StatisticsResponse>(`${API_URL}me/statistics/quiz/`);

const UserService = {
  getUserProfile,
  editUserProfile,
  getUserActivity,
  deleteUserActivity,
  getAllSubjectStatistic,
};

export default UserService;
