import { API_UNREAL } from '@/util/api';

import instance from './instance';

export const getUnrealHistory = (chatId) => {
  return instance({
    url: API_UNREAL.unreal(chatId),
    method: 'get',
  });
};
