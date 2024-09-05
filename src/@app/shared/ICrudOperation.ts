import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";

export interface ICrudOperation<IModel, IFormulario> {
  list(params: object): Promise<ApiResponsePaginate<IModel>>;
  register(params: IFormulario): Promise<IModel>;
  update(params: IFormulario, id: number): Promise<IModel>
  delete(id: number): Promise<any>
}
