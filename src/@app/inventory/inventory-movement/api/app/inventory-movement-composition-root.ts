import { InventoryMovementRelationsRepoQuerierAdapter, InventoryMovementRepoQuerierAdapter } from "../adapters/drivens";
import { InventoryMovementManageProxyAdapter, InventoryMovementRelationsManageProxyAdapter } from "../adapters/drivers";
import { InventoryMovementApi } from "./inventory-movement-api";
import { InventoryMovementRelationsApi } from './inventory-movement-relations-api';

const compositionMock = () => {
  const repoQuery = new InventoryMovementRepoQuerierAdapter();
  const api = new InventoryMovementApi(repoQuery);
  const inventoryMovementProxyAdapter = new InventoryMovementManageProxyAdapter(api);

  const repoQueryRelations = new InventoryMovementRelationsRepoQuerierAdapter();
  const apiRelations = new InventoryMovementRelationsApi(repoQueryRelations);
  const movementRelationProxyAdapterApi = new InventoryMovementRelationsManageProxyAdapter(apiRelations);
  return {
    movementApi: inventoryMovementProxyAdapter,
    movementRelationApi: movementRelationProxyAdapterApi
  }
}
export const { movementApi, movementRelationApi } = compositionMock();
