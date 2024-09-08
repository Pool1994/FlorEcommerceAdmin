import { IDateAt } from "@/@core/utils/contracts-commons";

export interface BrandForm {
  name: string;
  description?: string;
}
export interface BrandModel extends IDateAt, BrandForm {
  id: number;
}
