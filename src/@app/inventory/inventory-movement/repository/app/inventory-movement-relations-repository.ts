import { IApiMethods } from "@/@app/shared/apis/contract/IApiMethods";
import { ForMonitoring } from "../ports/drivens";
import { ForManagingRelationsInventoryMovementRepository } from "../ports/drivers";
import { InventoryMovementTypeSchema, MovementDestination, MovementType, ReasonForInventoryMovementSchema, WareHouseSchema } from "./schemas";

export class InventoryMovementRelationsRepository implements ForManagingRelationsInventoryMovementRepository {
  constructor(private readonly api: IApiMethods, private readonly logger: ForMonitoring) { }
  async wareHouses(): Promise<Array<WareHouseSchema>> {
    this.logger.log("INFO", "Warehouses");
    return await this.api.get<Array<WareHouseSchema>, any>("/inventory/movement/relations/ware-house");
  }
  async inventoryMovementTypes(type: MovementType, destination: MovementDestination): Promise<Array<InventoryMovementTypeSchema>> {
    this.logger.log("INFO", "InventoryMovementTypes");
    return await this.api.post<Array<InventoryMovementTypeSchema>, object>("/inventory/movement/relations/inventory-movement-type", { type, destination });
  }
  async reasonsForInventoryMovement(type: MovementType): Promise<Array<ReasonForInventoryMovementSchema>> {
    this.logger.log("INFO", "ReasonsForInventoryMovement");
    return await this.api.post<Array<ReasonForInventoryMovementSchema>, object>("/inventory/movement/relations/reasons-inventory-movement", { type });
  }
}
