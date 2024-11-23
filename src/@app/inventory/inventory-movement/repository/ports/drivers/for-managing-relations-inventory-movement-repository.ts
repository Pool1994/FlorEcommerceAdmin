import { InventoryMovementTypeSchema, MovementDestination, MovementType, ReasonForInventoryMovementSchema, WareHouseSchema } from "../../app/schemas";

export interface ForManagingRelationsInventoryMovementRepository {
  wareHouses(): Promise<Array<WareHouseSchema>>;
  inventoryMovementTypes(type: MovementType, destination: MovementDestination): Promise<Array<InventoryMovementTypeSchema>>;
  reasonsForInventoryMovement(type: MovementType): Promise<Array<ReasonForInventoryMovementSchema>>;
}
