export interface API_RESPONSE<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data?: T;
}
