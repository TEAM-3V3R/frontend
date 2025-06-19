import instance from './instance';
import { API_AUTH } from '@/util/api';

export const postLogin = (data) => {
  return instance({
    method: 'post',
    url: API_AUTH.login,
    data,
  });
};

export const postLogout = (data) => {
  return instance({
    method: 'post',
    url: API_AUTH.logout,
    data,
  });
};

export const getCheckId = (id) => {
  return instance({
    method: 'get',
    url: API_AUTH.check,
    params: { id },
  });
};
