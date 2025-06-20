import instance from './instance';

import { API_CATEGORY } from '@/util/api';

export const postCategory = (promptId) => {
  return instance({
    method: 'POST',
    url: API_CATEGORY.category,
    params: {
      'prompt-id': promptId,
    },
  });
};
