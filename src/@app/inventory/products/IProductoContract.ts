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
  images: Array<IProductImageForm>;
  product_type: "NACIONAL" | "IMPORTADO"
}
export interface ProductModel extends IProductForm, IDateAt {
  id: number;
  category: CategoryModel;
  sub_category: SubCategoryModel;
  brand: BrandModel;
}
export interface IDetailInventoryForm {
  warehouse_id: number;
  ware_house: string;
  quantity: number;
  minimum_quantity: number;
  maximum_quantity: number;
  completed: boolean;
  default?: boolean;
}
export interface IContainerImage {
  image?: File;
  urlImage?: string;
  hasImage?: boolean;
  selected?: boolean;
  plus: boolean;
  favorite?: boolean;
}
export interface IProductImageForm {
  image?: File;
  is_favorite: boolean;
  image_url: string;
}
export interface IProductImageModel extends IProductImageForm {
  product_id: number;
}
