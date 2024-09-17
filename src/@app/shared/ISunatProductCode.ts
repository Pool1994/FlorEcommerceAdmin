
export interface ISunatProductCode {
  id: number;
  description: string;
  code: number;
}
export interface TaxModel {
  id: number;
  name: string;
  percentage: number;
  type: "IGV" | "OTRO";
}
