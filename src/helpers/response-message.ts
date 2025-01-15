/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CustomeResponseType {
  status: boolean;
  message: string;
  data?: any;
}

const CustomeResponse = (data: CustomeResponseType) => {
  return data;
};

export default CustomeResponse;
