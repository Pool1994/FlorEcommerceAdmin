import { inventoryMovementRelationsProxy } from "../../../repository/app/composition-root";
import { InventoryMovementTypeSchema, ReasonForInventoryMovementSchema, WareHouseSchema } from "../../../repository/app/schemas";
import { MovementDestinationApi, MovementTypeApi } from "../../app/schemas";
import { ForRepoQueryingInventoryRelationsMovement } from "../../ports/drivens";

export class InventoryMovementRelationsRepoQuerierAdapter implements ForRepoQueryingInventoryRelationsMovement {
  getWareHouses(): Promise<Array<WareHouseSchema>> {
    return inventoryMovementRelationsProxy.wareHouses();
  }
  getInventoryMovementTypes(type: MovementTypeApi, destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchema>> {
    return inventoryMovementRelationsProxy.inventoryMovementTypes(type as any, destination as any);
  }
  getReasonsForInventoryMovement(type: MovementTypeApi): Promise<Array<ReasonForInventoryMovementSchema>> {
    return inventoryMovementRelationsProxy.reasonsForInventoryMovement(type as any);
  }
}
