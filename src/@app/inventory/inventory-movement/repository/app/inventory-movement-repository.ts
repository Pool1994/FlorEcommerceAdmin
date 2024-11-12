import { IApiMethods } from "@/@app/shared/apis/contract/IApiMethods";
import { ApiResponsePaginate } from "@/@core/utils/contracts-commons";
import { ForMonitoring } from "../ports/drivens";
import { ForManagingInventoryMovementRepository } from "../ports/drivers";
import { InventoryMovementRepositorySchema, InventoryMovementSchema } from "./schemas";
import { StatusInventoryMovement } from "./types";

export class InventoryMovementRepository implements ForManagingInventoryMovementRepository {
  constructor(private readonly api: IApiMethods, private readonly logger: ForMonitoring) {
  }
  async list(params: object): Promise<ApiResponsePaginate<InventoryMovementRepositorySchema>> {
    return await this.api.get<ApiResponsePaginate<InventoryMovementRepositorySchema>, object>("/inventory/movement/list", params);
  }
  async register(inventory_movement: InventoryMovementSchema): Promise<InventoryMovementRepositorySchema> {
    return await this.api.post<InventoryMovementRepositorySchema, InventoryMovementSchema>("/inventory/movement/register", inventory_movement);
  }
  async update(id: number, inventory_movement: InventoryMovementSchema): Promise<InventoryMovementRepositorySchema> {
    return await this.api.put<InventoryMovementRepositorySchema, InventoryMovementSchema>(`/inventory/movement/${id}/update`, inventory_movement);
  }
  async delete(id: number): Promise<string> {
    return await this.api.deleted<string>(`/inventory/movement/${id}/delete`);
  }
  async changeStatus(id: number, status: StatusInventoryMovement): Promise<InventoryMovementRepositorySchema> {
    return await this.api.put<InventoryMovementRepositorySchema, object>(`/inventory/movement/${id}/changeStatus`, { status: status });
  }
  async getById(id: number): Promise<InventoryMovementRepositorySchema> {
    return await this.api.get<InventoryMovementRepositorySchema, number>(`/inventory/movement/${id}`);
  }
}
