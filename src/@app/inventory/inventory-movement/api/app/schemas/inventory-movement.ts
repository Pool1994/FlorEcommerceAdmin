import { CurrencyType, StatusInventoryMovement } from "../../../repository/app/types";

export interface InventoryMovementSchemaApi {
  id: number;
  inventory_movement_type_id: number;
  ware_house_id: number;
  reason_for_inventory_movement_id: number;
  movement_date: Date;
  descripcion: string;
  currency_type: CurrencyType;
  exchange_rate: number;
  status: StatusInventoryMovement,
  created_at: Date;
  updated_at: Date;
}
export type InventoryMovementRegister = Omit<InventoryMovementSchemaApi, 'id' | 'created_at' | 'updated_at'>;
export type InventoryMovementUpdate = Omit<InventoryMovementSchemaApi, 'id' | 'created_at' | 'updated_at'>;
export interface InventoryMovementUpdating {
  id: number;
  update: 'MODEL' | 'STATUS';
  status?: StatusInventoryMovement;
  inventory_movement?: InventoryMovementUpdate;
};
