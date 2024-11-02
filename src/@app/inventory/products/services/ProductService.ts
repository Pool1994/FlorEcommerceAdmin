import { ApiGeneral } from "@/@app/shared/ApiGeneral";
import { ResponseHttpApi } from "@/@app/shared/ICrudOperation";
import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { ProductModel } from "../IProductoContract";

class ProductService {
  private api: ApiGeneral;
  constructor() {
    this.api = new ApiGeneral();
  }
  async list(params: any) {
    return await this.api.get<ApiResponsePaginate<ProductModel>, FormData>("/product/list", params);
  }
  async edit(id: number) {
    return await this.api.get<ProductModel, number>(`/product/${id}/edit`);
  }
  async register(params: FormData) {
    return await this.api.postMultiPart<ResponseHttpApi<ProductModel>, FormData>("/product/store", params);
  }
  async update(params: FormData, id: number) {
    return await this.api.postMultiPart<ResponseHttpApi<ProductModel>, FormData>(`/product/update/${id}`, params);
  }
  async delete(id: number) {
    return await this.api.deleted<string>(`/product/delete/${id}`);
  }

}
export default new ProductService();
