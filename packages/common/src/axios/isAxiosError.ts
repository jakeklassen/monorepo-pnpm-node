import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isAxiosError = (err: any): err is AxiosError =>
  'isAxiosError' in err;
