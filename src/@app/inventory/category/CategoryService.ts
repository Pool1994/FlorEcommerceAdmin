import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { ICrudOperation, ResponseHttpApi } from "../../shared/ICrudOperation";
import { CategoryForm, CategoryModel } from "./ICategoryContracts";

class CategoryService implements ICrudOperation<CategoryModel, CategoryForm> {
  async list(params: object) {
    try {
      const { data } = await $axiosIns.get<ApiResponsePaginate<CategoryModel>>('/category/list', {
        params
      });
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async register(params: CategoryForm) {
    try {
      const { data } = await $axiosIns.post<ResponseHttpApi<CategoryModel>>('/category/register', params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async update(params: CategoryForm, id: number) {
    try {
      const { data } = await $axiosIns.put<ResponseHttpApi<CategoryModel>>(`/category/update/${id}`, params);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
  async delete(id: number) {
    try {
      const { data } = await $axiosIns.delete<string>(`/category/delete/${id}`);
      return data;
    } catch (ex) {
      throw ex;
    }
  }
}
export default new CategoryService();
