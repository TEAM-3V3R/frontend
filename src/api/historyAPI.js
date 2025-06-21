import { API_HISTORY } from '@/util/api';
import instance from './instance';

export const getHistory = (paints, sort) => {
  const params = paints.length === 3 ? { sort } : { paints: paints[0], sort };

  return instance({
    method: 'GET',
    url: API_HISTORY.history,
    params,
  });
};
