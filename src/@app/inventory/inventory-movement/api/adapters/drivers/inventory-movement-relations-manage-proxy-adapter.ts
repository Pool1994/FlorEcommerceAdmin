import { InventoryMovementRelationsApi } from "../../app/inventory-movement-relations-api";
import { InventoryMovementTypeSchemaApi, MovementDestinationApi, ReasonInventoryMovementSchemaApi, WareHouseSchemaApi } from "../../app/schemas";
import { FormManageRelationsInventoryMovement } from "../../ports/drivers";

export class InventoryMovementRelationsManageProxyAdapter implements FormManageRelationsInventoryMovement {
  constructor(private readonly apiRelations: InventoryMovementRelationsApi) { }
  getAllWareHouses(): Promise<Array<WareHouseSchemaApi>> {
    return this.apiRelations.getAllWareHouses();
  }
  getInventoryMovementEntrie(destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchemaApi>> {
    return this.apiRelations.getInventoryMovementEntrie(destination);
  }
  getInventoryMovementExit(destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchemaApi>> {
    return this.apiRelations.getInventoryMovementExit(destination);
  }
  getReasonsForInventoryMovementEntrie(): Promise<Array<ReasonInventoryMovementSchemaApi>> {
    return this.apiRelations.getReasonsForInventoryMovementEntrie();
  }
  getReasonsForInventoryMovementExit(): Promise<Array<ReasonInventoryMovementSchemaApi>> {
    return this.apiRelations.getReasonsForInventoryMovementExit();
  }
}
