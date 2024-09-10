import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { ICrudOperation, ResponseHttpApi } from "../../shared/ICrudOperation";
import { PackagingForm, PackagingModel } from "./IPackagingContracts";
class PackagingService implements ICrudOperation<PackagingModel, PackagingForm> {
  async list(params: object) {
    try {
      const { data } = await $axiosIns.get<ApiResponsePaginate<PackagingModel>>('/packagings/list', {
        params
      });
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async register(params: PackagingForm) {
    try {
      const { data } = await $axiosIns.post<ResponseHttpApi<PackagingModel>>('/packagings/store', params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async update(params: PackagingForm, id: number) {
    try {
      const { data } = await $axiosIns.put<ResponseHttpApi<PackagingModel>>(`/packagings/update/${id}`, params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async delete(id: number) {
    try {
      const { data } = await $axiosIns.delete<string>(`/packagings/delete/${id}`);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async getPackaging() {
    try {
      const { data } = await $axiosIns.get<ApiResponsePaginate<PackagingModel>>('/packagings/list', {
        params: {
          itemsPerPage: 1000,
          page: 1,
          search: '',
        }
      });
      return data.data.map(item => ({ id: item.id, text: item.description }));
    } catch (ex) {
      throw ex;
    }
  }
}
export default new PackagingService();
