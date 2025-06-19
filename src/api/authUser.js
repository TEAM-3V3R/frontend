import instance from './instance';

import { API_USER } from '@/util/api';

export const postSignin = (data) => {
  return instance({
    method: 'post',
    url: API_USER.signin,
    data,
  });
};

export const getFindUser = () => {
  return instance({
    method: 'get',
    url: API_USER.find,
  });
};

export const deleteUser = () => {
  return instance({
    method: 'delete',
    url: API_USER.delete,
  });
};

export const putUpdateUser = (data) => {
  return instance({
    method: 'put',
    url: API_USER.update,
    data,
  });
};
