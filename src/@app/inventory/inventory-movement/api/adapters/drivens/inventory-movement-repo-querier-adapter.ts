import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { inventoryMovementRepositoryProxy } from "../../../repository/app/composition-root";
import { InventoryMovementRepositorySchema } from "../../../repository/app/schemas";
import { StatusInventoryMovement } from "../../../repository/app/types";
import { InventoryMovementRegister, InventoryMovementUpdate } from "../../app/schemas";
import { ForRepoQueryingInventoryMovement } from "../../ports/drivens";


export class InventoryMovementRepoQuerierAdapter implements ForRepoQueryingInventoryMovement {
  async getAllInventoryMovements(params: object): Promise<ApiResponsePaginate<InventoryMovementRepositorySchema>> {
    return inventoryMovementRepositoryProxy.list(params);
  }
  async createInventoryMovement(inventory_movement: InventoryMovementRegister): Promise<InventoryMovementRepositorySchema> {
    return inventoryMovementRepositoryProxy.register(inventory_movement);
  }
  async updateInventoryMovement(id: number, inventory_movement: InventoryMovementUpdate): Promise<InventoryMovementRepositorySchema> {
    return inventoryMovementRepositoryProxy.update(id, inventory_movement);
  }
  async getInventoryMovementById(id: number): Promise<InventoryMovementRepositorySchema> {
    return inventoryMovementRepositoryProxy.getById(id);
  }
  async deleteInventoryMovement(id: number): Promise<string> {
    return inventoryMovementRepositoryProxy.delete(id);
  }
  async changeStatusInventoryMovement(id: number, status: StatusInventoryMovement): Promise<InventoryMovementRepositorySchema> {
    return inventoryMovementRepositoryProxy.changeStatus(id, status);
  }
}
