import { ApiPrueba } from "@/@app/shared/apis/ApiPrueba";
import { LoggerStubAdapter } from "../adapters/drivens";
import { InventoryMovementManageProxyAdapter } from "../adapters/drivers";
import { InventoryMovementRepository } from "./inventory-movement-repository";

export const compositionMock = () => {
  const api = new ApiPrueba();
  const logger = new LoggerStubAdapter();
  const repositoryMock = new InventoryMovementRepository(api, logger);
  const inventoryMovementRepositoryProxy = new InventoryMovementManageProxyAdapter(repositoryMock);
  return {
    inventoryMovementRepositoryProxy
  }
}
export const { inventoryMovementRepositoryProxy } = compositionMock();
