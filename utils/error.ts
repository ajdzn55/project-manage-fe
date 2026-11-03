import axios, { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/lib/client';

// 오류 메시지를 공통 형식으로 정리하는 함수
export const toApiError = (error: unknown): AxiosError => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return new AxiosError('알 수 없는 오류가 발생했습니다.');
  }

  const data = error.response?.data;

  error.message = Array.isArray(data?.message)
    ? data.message.join(', ')
    : (data?.message ?? error.message); // 서버 오류 메시지 없을 경우 axios 오류 메시지 사용

  // 메시지만 변경하고, 나머지 정보는 유지
  return error;
};
