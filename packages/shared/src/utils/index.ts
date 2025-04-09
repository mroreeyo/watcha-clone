// 공통 유틸리티 함수
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR').format(date);
}; 