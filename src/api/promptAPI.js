import instance from './instance';

import { API_PROMPT } from '@/util/api';

export const postPrompt = (data, paints) => {
  return instance({
    method: 'POST',
    url: API_PROMPT.generate,
    data: data,
    params: {
      paints,
    },
  });
};

export const postInpainting = (data) => {
  return instance({
    method: 'POST',
    url: API_PROMPT.edit,
    data: data,
  });
};
