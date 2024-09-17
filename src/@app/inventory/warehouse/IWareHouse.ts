import { IDateAt } from "@/@core/utils/contracts-commons";

export interface IUbigeo extends IDateAt {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  legal_name: string;
}
export interface IWareHouseForm {
  name: string;
  description: string;
  address: string;
  active?: boolean;
  ubigeo_id: string;
}
export interface WareHouseModel extends IWareHouseForm, IDateAt {
  id: number;
  ubigeo: IUbigeo;
}
export interface UbigeoSelect {
  id: string;
  name: string;
}
