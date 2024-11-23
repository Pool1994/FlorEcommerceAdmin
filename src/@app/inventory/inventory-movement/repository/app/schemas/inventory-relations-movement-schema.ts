export interface WareHouseSchema {
  id: number;
  name: string;
}

export interface InventoryMovementTypeSchema {
  id: number;
  name: string;
  capture_type: string;
  destination: string;
  type: string;
}
export interface ReasonForInventoryMovementSchema {
  id: number;
  name: string;
  type: string;
}
export enum MovementType {
  Entrie = "ENTRADA",
  Exit = "SALIDA"
}
export enum MovementDestination {
  Inventory = "INVENTARIO",
  Purchase = "COMPRAS",
  Sale = "VENTAS"
}

