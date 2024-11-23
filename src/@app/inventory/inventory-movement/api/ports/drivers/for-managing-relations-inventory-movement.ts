
import { InventoryMovementTypeSchemaApi, MovementDestinationApi, ReasonInventoryMovementSchemaApi, WareHouseSchemaApi } from "../../app/schemas";

export interface FormManageRelationsInventoryMovement {
  getAllWareHouses(): Promise<Array<WareHouseSchemaApi>>;
  getInventoryMovementEntrie(destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchemaApi>>;
  getInventoryMovementExit(destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchemaApi>>;
  getReasonsForInventoryMovementEntrie(): Promise<Array<ReasonInventoryMovementSchemaApi>>;
  getReasonsForInventoryMovementExit(): Promise<Array<ReasonInventoryMovementSchemaApi>>;
}
