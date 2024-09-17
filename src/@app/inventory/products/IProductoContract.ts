import { YesNo } from "@/@app/shared/TypeCore";
import { IDateAt } from "@/@core/utils/contracts-commons";
import { BrandModel } from "../brand/IBrandContracts";
import { CategoryModel } from "../category/ICategoryContracts";
import { SubCategoryModel } from "../subcategory/ISubCategoryContracts";

export interface IProductForm {
  category_id: number;
  sub_category_id: number;
  brand_id: number;
  name: string;
  description?: string;
  unit_price: number;
  use_inventory: YesNo;
  tax_id: number;
  stock: number;
  sku: string;
  barcode: string;
  minumun_stock: number;
  photo?: string;
  initial_cost: number;
  base_price: number;
  sunat_product_code_id: number;
}
export interface ProductModel extends IProductForm, IDateAt {
  id: number;
  category: CategoryModel;
  sub_category: SubCategoryModel;
  brand: BrandModel
}
