import { API_REPORT } from '@/util/api';

import instance from './instance';

export const getReport = (chatId) => {
    return instance({
        method: 'GET', 
        url: API_REPORT.report(chatId),
    });
};

export const postReports = (chatId) => {
    return instance({
        method: 'POST',
        url: API_REPORT.reports(chatId),
    })
}