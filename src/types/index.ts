export interface API_RESPONSE<T> {
  statusCode: number;
  message: string;
  error: string;
  data?: T;
}
