import { ICrudOperation, ResponseHttpApi } from "@/@app/shared/ICrudOperation";
import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { SubCategoryForm, SubCategoryModel } from "./ISubCategoryContracts";

class SubCategoryService implements ICrudOperation<SubCategoryModel, SubCategoryForm> {
  async list(params: object) {
    try {
      const { data } = await $axiosIns.get<ApiResponsePaginate<SubCategoryModel>>('/subcategory/list', {
        params
      });
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async register(params: SubCategoryForm) {
    try {
      const { data } = await $axiosIns.post<ResponseHttpApi<SubCategoryModel>>('/subcategory/register', params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async update(params: SubCategoryForm, id: number) {
    try {
      const { data } = await $axiosIns.put<ResponseHttpApi<SubCategoryModel>>(`/subcategory/update/${id}`, params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async delete(id: number) {
    try {
      const { data } = await $axiosIns.delete<string>(`/subcategory/delete/${id}`);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
}
export default new SubCategoryService();
