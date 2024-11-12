import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { InventoryMovementRepositorySchema } from "../../../repository/app/schemas";
import { StatusInventoryMovement } from "../../../repository/app/types";
import { InventoryMovementRegister, InventoryMovementUpdate } from "../../app/schemas";

export interface ForRepoQueryingInventoryMovement {
  getAllInventoryMovements(params: object): Promise<ApiResponsePaginate<InventoryMovementRepositorySchema>>;
  createInventoryMovement(inventory_movement: InventoryMovementRegister): Promise<InventoryMovementRepositorySchema>;
  updateInventoryMovement(id: number, inventory_movement: InventoryMovementUpdate): Promise<InventoryMovementRepositorySchema>;
  getInventoryMovementById(id: number): Promise<InventoryMovementRepositorySchema>;
  deleteInventoryMovement(id: number): Promise<string>;
  changeStatusInventoryMovement(id: number, status: StatusInventoryMovement): Promise<InventoryMovementRepositorySchema>;
}
