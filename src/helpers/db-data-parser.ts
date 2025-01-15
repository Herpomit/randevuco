/* eslint-disable @typescript-eslint/no-explicit-any */
export const dbDataParser = (data: any) => {
  const plainResult = JSON.parse(JSON.stringify(data));
  return plainResult;
};
