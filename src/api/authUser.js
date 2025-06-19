import instance from './instance';

import { API_USER } from '@/util/api';

export const postSignin = (data) => {
  return instance({
    method: 'post',
    url: API_USER.signin,
    data,
  });
};

export const getFindUser = (userNo) => {
  return instance({
    method: 'get',
    url: API_USER.find,
    headers: { 'user-no': userNo },
  });
};

export const deleteUser = (userNo) => {
  return instance({
    method: 'delete',
    url: API_USER.delete,
    headers: { 'user-no': userNo },
  });
};

export const putUpdateUser = (data, userNo) => {
  return instance({
    method: 'put',
    url: API_USER.update,
    data,
    headers: { 'user-no': userNo },
  });
};
