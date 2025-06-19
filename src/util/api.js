export const API_CATEGORY = Object.freeze({
  category: 'category/receive-category',
  categories: 'category/show',
  categoriesText: 'category/show-all-category-text',
});

export const API_AUTH = Object.freeze({
  login: 'auth/login',
  logout: 'auth/logout',
  check: 'auth/check-id',
});

export const API_MORPHEME = Object.freeze({
  morpheme: 'morpheme/',
});
export const API_IMAGE = Object.freeze({
  download: 'image/download',
});
export const API_CHAT = Object.freeze({
  chat: 'chat/create',
  title: (chatId) => `chat/${chatId}/title`,
  find: 'chat/find-chat',
  all: 'chat/find-all-chat',
});
export const API_UNREAL = Object.freeze({
  unreal: (chatId) => `unreal-history/${chatId}`,
});

export const API_PROMPT = Object.freeze({
  generate: 'prompt/generate-image',
  edit: 'prompt/edit',
});
export const API_HISTORY = Object.freeze({
  history: 'history',
  historyID: (chatId) => `history/${chatId}`,
});
export const API_USER = Object.freeze({
  update: 'user/update',
  find: 'user/find',
  delete: 'user/delete',
  signin: 'user/signin',
});
