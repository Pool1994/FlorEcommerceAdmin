import { IApiMethods } from "./contract/IApiMethods";

export class ApiGeneral implements IApiMethods {
  async get<TReturn, TParams>(url: string, params?: TParams) {
    try {
      const { data } = await $axiosIns.get<TReturn>(url, { params });
      return data;
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
