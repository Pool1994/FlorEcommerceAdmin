import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { StatusInventoryMovement } from "../../repository/app/types";
import { ForRepoQueryingInventoryMovement } from "../ports/drivens";
import { ForManagingInventoryMovement } from "../ports/drivers";
import { InventoryMovementRegister, InventoryMovementSchemaApi, InventoryMovementUpdate, InventoryMovementUpdating } from "./schemas";


export class InventoryMovementApi implements ForManagingInventoryMovement {
  constructor(private repository: ForRepoQueryingInventoryMovement) { }
  listing(params: object): Promise<ApiResponsePaginate<InventoryMovementSchemaApi>> {
    return this.repository.getAllInventoryMovements(params);
  }
  creating(inventory_movement: InventoryMovementRegister): Promise<InventoryMovementSchemaApi> {
    return this.repository.createInventoryMovement(inventory_movement);
  }
  updating(updating: InventoryMovementUpdating): Promise<InventoryMovementSchemaApi> {
    if (updating.update === 'MODEL') {
      return this.repository.updateInventoryMovement(updating.id, updating.inventory_movement as InventoryMovementUpdate);
    } else {
      return this.repository.changeStatusInventoryMovement(updating.id, updating.status as StatusInventoryMovement);
    }
  }
  async getInventoryMovementById(id: number): Promise<InventoryMovementSchemaApi> {
    return this.repository.getInventoryMovementById(id);
  }
  async deleteInventoryMovement(id: number): Promise<string> {
    return this.repository.deleteInventoryMovement(id);
  }

}
