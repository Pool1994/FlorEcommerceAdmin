import { ApiGeneral } from "@/@app/shared";
import { LoggerStubAdapter } from "../adapters/drivens";
import { InventoryMovementManageProxyAdapter, InventoryMovementRelationsManageProxyAdapter } from "../adapters/drivers";
import { InventoryMovementRelationsRepository } from "./inventory-movement-relations-repository";
import { InventoryMovementRepository } from "./inventory-movement-repository";

export const compositionMock = () => {
  const api = new ApiGeneral();
  const logger = new LoggerStubAdapter();
  const repositoryMock = new InventoryMovementRepository(api, logger);
  const inventoryMovementRepositoryProxy = new InventoryMovementManageProxyAdapter(repositoryMock);

  const repositoryRelationsMock = new InventoryMovementRelationsRepository(api, logger);
  const inventoryMovementRelationsProxy = new InventoryMovementRelationsManageProxyAdapter(repositoryRelationsMock);
  return {
    inventoryMovementRepositoryProxy,
    inventoryMovementRelationsProxy
  }
}
export const { inventoryMovementRepositoryProxy, inventoryMovementRelationsProxy } = compositionMock();
