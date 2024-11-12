import { CurrencyType, StatusInventoryMovement } from "../types";

export interface InventoryMovementSchema {
  inventory_movement_type_id: number;
  ware_house_id: number;
  reason_for_inventory_movement_id: number;
  movement_date: Date;
  descripcion: string;
  currency_type: CurrencyType;
  exchange_rate: number;
  status: StatusInventoryMovement;
}
export interface InventoryMovementRepositorySchema extends InventoryMovementSchema {
  id: number;
  created_at: Date;
  updated_at: Date;
  inventory_movement_type: string;
  ware_house: string;
  reason_for_inventory_movement: string;
}
