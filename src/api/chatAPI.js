import { API_CHAT } from '@/util/api';
import instance from './instance';
export const getChatHistory = () => {
  return instance({
    method: 'get',
    url: API_CHAT.all,
  });
};

export const getChat = (chatId) => {
  return instance({
    method: 'get',
    url: API_CHAT.find,
    params: { chatId },
  });
};

export const patchChatTitle = (chatId, chatTitle) => {
  return instance({
    method: 'patch',
    url: API_CHAT.title(chatId),
    params: { chatTitle },
  });
};

export const postChat = (paints) => {
  return instance({
    method: 'post',
    url: API_CHAT.chat,
    params: { paints },
  });
};
