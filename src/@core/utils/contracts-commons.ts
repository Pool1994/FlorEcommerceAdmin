export interface IDateAt {
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date
}
export interface ApiResponsePaginate<T> {
  data: Array<T>,
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
export interface PaginateModel<T> extends ApiResponsePaginate<T> { }
