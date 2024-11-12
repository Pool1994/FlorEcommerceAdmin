import { InventoryMovementRepoQuerierStub } from "../adapters/drivens";
import { InventoryMovementManageProxyAdapter } from "../adapters/drivers";
import { InventoryMovementApi } from "./inventory-movement-api";

const compositionMock = () => {
  const repoQuery = new InventoryMovementRepoQuerierStub();
  const api = new InventoryMovementApi(repoQuery);
  const inventoryMovementProxyAdapter = new InventoryMovementManageProxyAdapter(api);
  return {
    inventoryMovementProxyAdapter
  }
}
export const { inventoryMovementProxyAdapter } = compositionMock();