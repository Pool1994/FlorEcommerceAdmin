import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { ICrudOperation, ResponseHttpApi } from "../../shared/ICrudOperation";
import { BrandForm, BrandModel } from "./IBrandContracts";
class BrandService implements ICrudOperation<BrandModel, BrandForm> {
  async list(params: object) {
    try {
      const { data } = await $axiosIns.get<ApiResponsePaginate<BrandModel>>('/brands/list', {
        params
      });
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async register(params: BrandForm) {
    try {
      const { data } = await $axiosIns.post<ResponseHttpApi<BrandModel>>('/brands/store', params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async update(params: BrandForm, id: number) {
    try {
      const { data } = await $axiosIns.put<ResponseHttpApi<BrandModel>>(`/brands/update/${id}`, params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async delete(id: number) {
    try {
      const { data } = await $axiosIns.delete<string>(`/brands/delete/${id}`);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async getBrands() {
    try {
      const { data } = await $axiosIns.get<ApiResponsePaginate<BrandModel>>('/brands/list', {
        params: {
          itemsPerPage: 1000,
          page: 1,
          search: '',
        }
      });
      return data.data.map(item => ({ id: item.id, text: item.name }));
    } catch (ex) {
      throw ex;
    }
  }
}
export default new BrandService();
