// 通用接口
export interface Pagination<T> {
  pages: number;
  total: number;
  size: number;
  hasNext: boolean;
  list: T[];
}
