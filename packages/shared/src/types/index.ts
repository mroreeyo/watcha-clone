// 공통 타입 정의
export interface CommonResponse<T> {
  data: T;
  status: number;
  message: string;
} 