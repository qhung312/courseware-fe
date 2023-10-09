import { API_URL } from '../config';

const login = () => {
  console.log('here');
  window.open(`${API_URL}auth/google/`, '_self');
};

const AuthService = { login };

export default AuthService;
