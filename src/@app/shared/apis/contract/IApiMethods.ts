export interface IApiMethods {
  get<TReturn, TParams>(url: string, params?: TParams): Promise<TReturn>;
  post<TReturn, TParams>(url: string, params: TParams): Promise<TReturn>;
  put<TReturn, TParams>(url: string, params: TParams): Promise<TReturn>;
  deleted<TReturn>(url: string): Promise<TReturn>;
  postMultiPart<TReturn, TParams>(url: string, params: TParams): Promise<TReturn>;
}
