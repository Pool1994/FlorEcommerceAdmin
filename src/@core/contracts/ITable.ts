export interface ITableHeader {
  key: string;
  title: string;
  align?: "center" | "end" | "start";
  sortable?: boolean;
  visible?: boolean;
  sortBy?: string;
}
export interface IDataTable<T> {
  items: Array<T>;
  fields: ITableHeader[];
  perPage: number;
  currentPage: number;
  search: string | undefined;
  loading: boolean;
  total: number;
}
export interface ISortBy {
  key: string;
  order: string;
}
export interface ITableOptions {
  groupBy?: [];
  itemsPerPage: number;
  page: number;
  search?: string | undefined;
  sortBy?: Array<ISortBy>;
}
export interface IRowTable<T> {
  item: T;
}
export interface EmitEventDataTable {
  (e: "refresh", opt: ITableOptions): void;
}
