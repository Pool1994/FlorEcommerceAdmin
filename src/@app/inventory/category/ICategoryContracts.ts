import { IDateAt } from "@/@core/utils/contracts-commons";

export interface CategoryForm {
  name: string;
  description?: string;
}
export interface CategoryModel extends IDateAt, CategoryForm {
  id: number;
}
