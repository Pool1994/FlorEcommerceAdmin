import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { InventoryMovementApi } from "../../app";
import { InventoryMovementRegister, InventoryMovementSchemaApi, InventoryMovementUpdating } from "../../app/schemas";
import { ForManagingInventoryMovement } from "../../ports/drivers";

export class InventoryMovementManageProxyAdapter implements ForManagingInventoryMovement {
  public constructor(private readonly api: InventoryMovementApi) { }
  listing(params: object): Promise<ApiResponsePaginate<InventoryMovementSchemaApi>> {
    return this.api.listing(params);
  }
  creating(inventory_movement: InventoryMovementRegister): Promise<InventoryMovementSchemaApi> {
    return this.api.creating(inventory_movement);
  }
  updating(updating: InventoryMovementUpdating): Promise<InventoryMovementSchemaApi> {
    return this.api.updating(updating);
  }
  getInventoryMovementById(id: number): Promise<InventoryMovementSchemaApi> {
    return this.api.getInventoryMovementById(id);
  }
  deleteInventoryMovement(id: number): Promise<string> {
    return this.api.deleteInventoryMovement(id);
  }
}
