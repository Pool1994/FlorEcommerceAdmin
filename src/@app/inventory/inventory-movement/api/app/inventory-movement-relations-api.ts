import { ForRepoQueryingInventoryRelationsMovement } from "../ports/drivens/for-repo-querying-inventory-relations-movement";
import { FormManageRelationsInventoryMovement } from "../ports/drivers";
import { InventoryMovementTypeSchemaApi, MovementDestinationApi, MovementTypeApi, ReasonInventoryMovementSchemaApi, WareHouseSchemaApi } from "./schemas";

export class InventoryMovementRelationsApi implements FormManageRelationsInventoryMovement {
  constructor(private readonly repository: ForRepoQueryingInventoryRelationsMovement) { }
  getAllWareHouses(): Promise<Array<WareHouseSchemaApi>> {
    return this.repository.getWareHouses();
  }
  async getInventoryMovementEntrie(destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchemaApi>> {
    const result = await this.repository.getInventoryMovementTypes(MovementTypeApi.Entrie, destination);
    let data: Array<InventoryMovementTypeSchemaApi> = [];
    result.forEach(item => {
      data.push({
        id: item.id,
        name: item.name
      });
    });
    return Promise.resolve(data);
  }
  async getInventoryMovementExit(destination: MovementDestinationApi): Promise<Array<InventoryMovementTypeSchemaApi>> {
    const result = await this.repository.getInventoryMovementTypes(MovementTypeApi.Exit, destination);
    let data: Array<InventoryMovementTypeSchemaApi> = [];
    result.forEach(item => {
      data.push({
        id: item.id,
        name: item.name
      });
    });
    return Promise.resolve(data);
  }
  async getReasonsForInventoryMovementEntrie(): Promise<Array<ReasonInventoryMovementSchemaApi>> {
    const result = await this.repository.getReasonsForInventoryMovement(MovementTypeApi.Entrie);
    let data: Array<ReasonInventoryMovementSchemaApi> = [];
    result.forEach(item => {
      data.push({
        id: item.id,
        name: item.name
      });
    });
    return Promise.resolve(data);
  }
  async getReasonsForInventoryMovementExit(): Promise<Array<ReasonInventoryMovementSchemaApi>> {
    const result = await this.repository.getReasonsForInventoryMovement(MovementTypeApi.Exit);
    let data: Array<ReasonInventoryMovementSchemaApi> = [];
    result.forEach(item => {
      data.push({
        id: item.id,
        name: item.name
      });
    });
    return Promise.resolve(data);
  }
}
