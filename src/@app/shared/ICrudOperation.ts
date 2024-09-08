import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";

export interface ICrudOperation<IModel, IFormulario> {
  list(params: object): Promise<ApiResponsePaginate<IModel>>;
  register(params: IFormulario): Promise<ResponseHttpApi<IModel>>;
  update(params: IFormulario, id: number): Promise<ResponseHttpApi<IModel>>
  delete(id: number): Promise<string>
}
export interface ResponseHttpApi<T> {
  response: T,
  message: string
}
