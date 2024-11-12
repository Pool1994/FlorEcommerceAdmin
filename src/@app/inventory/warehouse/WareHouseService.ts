import { ApiGeneral } from "@/@app/shared/apis/ApiGeneral";
import { ICrudOperation, ResponseHttpApi } from "@/@app/shared/ICrudOperation";
import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { IWareHouseForm, UbigeoSelect, WareHouseModel } from "./IWareHouse";

class WareHouseService extends ApiGeneral implements ICrudOperation<WareHouseModel, IWareHouseForm> {
  constructor() {
    super();
  }
  async list(params: object) {
    return await this.get<ApiResponsePaginate<WareHouseModel>, any>("/warehouse/index", params);
  }
  async register(params: IWareHouseForm) {
    return await this.post<ResponseHttpApi<WareHouseModel>, IWareHouseForm>("/warehouse/store", params);
  }
  async update(params: IWareHouseForm, id: number) {
    return await this.put<ResponseHttpApi<WareHouseModel>, IWareHouseForm>(`/warehouse/update/${id}`, params);
  }
  async delete(id: number) {
    return await this.deleted<string>(`/warehouse/active-inactive/${id}`);
  }
  async ubigeos(search: string) {
    return await this.get<Array<UbigeoSelect>, any>('/warehouse/relations/ubigeos', { search })
  }
}
export default new WareHouseService();
