import { ApiGeneral } from "@/@app/shared/ApiGeneral";
import { ResponseHttpApi } from "@/@app/shared/ICrudOperation";
import { ProductModel } from "../IProductoContract";

class ProductService {
  private api: ApiGeneral;
  constructor() {
    this.api = new ApiGeneral();
  }
  async register(params: FormData) {
    return await this.api.postMultiPart<ResponseHttpApi<ProductModel>, FormData>("/product/store", params);
  }
}
export default new ProductService();
