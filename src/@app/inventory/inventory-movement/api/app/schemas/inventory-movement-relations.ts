export interface WareHouseSchemaApi {
  id: number;
  name: string;
}
interface PresentationSchemaApi {
  id: number;
  presentation: string;
}
export interface ProductSchemaApi {
  id: number;
  name: string;
  presentations: Array<PresentationSchemaApi>;
}
export interface InventoryMovementTypeSchemaApi {
  id: number;
  name: string;
}
export interface ReasonInventoryMovementSchemaApi {
  id: number;
  name: string;
}
