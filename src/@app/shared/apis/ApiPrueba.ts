import { IApiMethods } from "./contract/IApiMethods";

export class ApiPrueba implements IApiMethods {
  async get<TReturn, TParams>(url: string, params?: TParams) {
    try {
      return {
        data: [
          {
            id: 1,
            name: 'name',
            description: 'description'
          }
        ],
        total: 1,
        per_page: 1,
        current_page: 1,
        last_page: 1,
        to: 1
      } as TReturn;
    } catch (e) {
      throw e;
    }
  }
  async post<TReturn, TParams>(url: string, params: TParams) {
    try {
      const { data } = await $axiosIns.post<TReturn>(url, params);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async put<TReturn, TParams>(url: string, params: TParams) {
    try {
      const { data } = await $axiosIns.put<TReturn>(url, params);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async deleted<TReturn>(url: string) {
    try {
      const { data } = await $axiosIns.delete<TReturn>(url);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async postMultiPart<TReturn, TParams>(url: string, params: TParams) {
    try {
      const { data } = await $axiosIns.post<TReturn>(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data;
    } catch (e) {
      throw e;
    }
  }
}
