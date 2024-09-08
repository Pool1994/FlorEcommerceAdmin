import { IDateAt } from "@/@core/utils/contracts-commons";
import { CategoryModel } from "../category/ICategoryContracts";

export interface SubCategoryForm {
  name: string;
  category_id: number;
  description?: string;
}
export interface SubCategoryModel extends IDateAt, SubCategoryForm {
  id: number;
  category: CategoryModel;
}
