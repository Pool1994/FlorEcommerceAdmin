
import { InventoryMovementRelationsRepository } from "../../app/inventory-movement-relations-repository";
import { InventoryMovementTypeSchema, MovementDestination, MovementType, ReasonForInventoryMovementSchema, WareHouseSchema } from "../../app/schemas";
import { ForManagingRelationsInventoryMovementRepository } from "../../ports/drivers";

export class InventoryMovementRelationsManageProxyAdapter implements ForManagingRelationsInventoryMovementRepository {
  constructor(private readonly api: InventoryMovementRelationsRepository) { }
  wareHouses(): Promise<Array<WareHouseSchema>> {
    return this.api.wareHouses();
  }
  inventoryMovementTypes(type: MovementType, destination: MovementDestination): Promise<Array<InventoryMovementTypeSchema>> {
    return this.api.inventoryMovementTypes(type, destination);
  }
  reasonsForInventoryMovement(type: MovementType): Promise<Array<ReasonForInventoryMovementSchema>> {
    return this.api.reasonsForInventoryMovement(type);
  }
}
