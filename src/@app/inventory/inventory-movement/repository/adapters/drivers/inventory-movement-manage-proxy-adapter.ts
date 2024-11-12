import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { InventoryMovementRepository } from "../../app/inventory-movement-repository";
import { InventoryMovementRepositorySchema, InventoryMovementSchema } from "../../app/schemas";
import { StatusInventoryMovement } from "../../app/types";
import { ForManagingInventoryMovementRepository } from "../../ports/drivers";

export class InventoryMovementManageProxyAdapter implements ForManagingInventoryMovementRepository {
  constructor(private readonly api: InventoryMovementRepository) { }
  list(params: object): Promise<ApiResponsePaginate<InventoryMovementRepositorySchema>> {
    return this.api.list(params);
  }
  register(inventory_movement: InventoryMovementSchema): Promise<InventoryMovementRepositorySchema> {
    return this.api.register(inventory_movement);
  }
  update(id: number, inventory_movement: InventoryMovementSchema): Promise<InventoryMovementRepositorySchema> {
    return this.api.update(id, inventory_movement);
  }
  delete(id: number): Promise<string> {
    return this.api.delete(id);
  }
  async changeStatus(id: number, status: StatusInventoryMovement): Promise<InventoryMovementRepositorySchema> {
    return await this.api.changeStatus(id, status);
  }
  getById(id: number): Promise<InventoryMovementRepositorySchema> {
    return this.api.getById(id);
  }
}
