import { InventoryMovementTypeSchemaApi, ProductSchemaApi, ReasonInventoryMovementSchemaApi, WareHouseSchemaApi } from "../../app/schemas";

export interface ForRelationsInventoryMovement {
  getAllWareHouses(): Promise<Array<WareHouseSchemaApi>>;
  getAllProducts(): Promise<Array<ProductSchemaApi>>;
  getAllInventoryMovementTypes(): Promise<InventoryMovementTypeSchemaApi>;
  getAllReasonsInventoryMovement(): Promise<ReasonInventoryMovementSchemaApi>;
}
