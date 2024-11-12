import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { InventoryMovementRegister, InventoryMovementSchemaApi, InventoryMovementUpdating } from "../../app/schemas";

export interface ForManagingInventoryMovement {
  listing(params: object): Promise<ApiResponsePaginate<InventoryMovementSchemaApi>>;
  creating(inventory_movement: InventoryMovementRegister): Promise<InventoryMovementSchemaApi>;
  updating(updating: InventoryMovementUpdating): Promise<InventoryMovementSchemaApi>;
  getInventoryMovementById(id: number): Promise<InventoryMovementSchemaApi>;
  deleteInventoryMovement(id: number): Promise<string>;
}
