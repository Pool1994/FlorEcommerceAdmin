import { InventoryMovementTypeSchema, ReasonForInventoryMovementSchema, WareHouseSchema } from "../../../repository/app/schemas";
import { MovementDestinationApi, MovementTypeApi } from "../../app/schemas";

export interface ForRepoQueryingInventoryRelationsMovement {
  getWareHouses(): Promise<Array<WareHouseSchema>>;
  getInventoryMovementTypes(type: MovementTypeApi, destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchema>>;
  getReasonsForInventoryMovement(type: MovementTypeApi): Promise<Array<ReasonForInventoryMovementSchema>>;
}
