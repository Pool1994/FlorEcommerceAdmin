import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { InventoryMovementRepositorySchema, InventoryMovementSchema } from "../../app/schemas";
import { StatusInventoryMovement } from "../../app/types";

export interface ForManagingInventoryMovementRepository {
  list(params: object): Promise<ApiResponsePaginate<InventoryMovementRepositorySchema>>;
  register(inventory_movement: InventoryMovementSchema): Promise<InventoryMovementRepositorySchema>;
  update(id: number, inventory_movement: InventoryMovementSchema): Promise<InventoryMovementRepositorySchema>;
  delete(id: number): Promise<string>;
  changeStatus(id: number, status: StatusInventoryMovement): Promise<InventoryMovementRepositorySchema>;
  getById(id: number): Promise<InventoryMovementRepositorySchema>;
}
