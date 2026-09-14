/* API 요청 body에서 undefined, NaN 값을 제외하는 함수 */
export const omitInvalidValues = <T extends Record<string, unknown>>(
  body: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(body).filter(([, value]) => {
      if (value === undefined) {
        return false;
      }

      return !(typeof value === 'number' && Number.isNaN(value));
    }),
  ) as Partial<T>;
};
